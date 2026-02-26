# Deploy to AWS EC2 (Free Tier) - Final Script

$AppName = "surajhub"
$Region = "us-east-1"
$AmiId = "ami-0fa3fe0fa7920f68e" # Amazon Linux 2023
$InstanceType = "t3.micro" # Free Tier Eligible (t2.micro not available)
$KeyName = "surajhub-key"
$SgName = "surajhub-sg"
$RoleName = "EC2InstanceRole-$AppName"
$ProfileName = "EC2InstanceProfile-$AppName"

$env:AWS_PROFILE = "default"
# $env:AWS_PAGER = "" # Removing this as we use --no-cli-pager

Write-Host "Starting Deployment..." -ForegroundColor Cyan

# Helper function to check if resource exists
function Get-Resource {
    param($Command)
    try {
        Invoke-Expression "$Command --no-cli-pager" 2>$null
    }
    catch {
        $null
    }
}

# 1. IAM Setup
Write-Host "Configuring IAM..."
$RoleArn = Get-Resource "aws iam get-role --role-name $RoleName --query 'Role.Arn' --output text"

if (-not $RoleArn) {
    Write-Host "Creating Role..."
    # Write policy to file to avoid quoting issues
    $TrustPolicy = @{
        Version   = "2012-10-17"
        Statement = @(
            @{
                Effect    = "Allow"
                Principal = @{ Service = "ec2.amazonaws.com" }
                Action    = "sts:AssumeRole"
            }
        )
    } | ConvertTo-Json -Depth 3
    
    $TrustPolicy | Set-Content "trust-policy.json"
    
    aws iam create-role --role-name $RoleName --assume-role-policy-document file://trust-policy.json --no-cli-pager
    Remove-Item "trust-policy.json" -Force
    
    aws iam attach-role-policy --role-name $RoleName --policy-arn "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly" --no-cli-pager
}

$ProfileArn = Get-Resource "aws iam get-instance-profile --instance-profile-name $ProfileName --query 'InstanceProfile.Arn' --output text"
if (-not $ProfileArn) {
    Write-Host "Creating Instance Profile..."
    aws iam create-instance-profile --instance-profile-name $ProfileName --no-cli-pager
    aws iam add-role-to-instance-profile --instance-profile-name $ProfileName --role-name $RoleName --no-cli-pager
    Write-Host "Waiting for IAM propagation..."
    Start-Sleep -Seconds 15 
}

# 2. Key Pair
Write-Host "Configuring Key Pair..."
if (-not (Test-Path "$KeyName.pem")) {
    aws ec2 create-key-pair --key-name $KeyName --query "KeyMaterial" --output text --no-cli-pager > "$KeyName.pem" 2>$null
}

# 3. Security Group
Write-Host "Configuring Security Group..."
$GroupId = Get-Resource "aws ec2 describe-security-groups --group-names $SgName --query 'SecurityGroups[0].GroupId' --output text"
if (-not $GroupId) {
    Write-Host "Creating Security Group..."
    $VpcId = aws ec2 describe-vpcs --query "Vpcs[0].VpcId" --output text --no-cli-pager
    $GroupId = aws ec2 create-security-group --group-name $SgName --description "SurajHub SG" --vpc-id $VpcId --output text --no-cli-pager
    
    aws ec2 authorize-security-group-ingress --group-id $GroupId --protocol tcp --port 22 --cidr 0.0.0.0/0 --no-cli-pager
    aws ec2 authorize-security-group-ingress --group-id $GroupId --protocol tcp --port 3000 --cidr 0.0.0.0/0 --no-cli-pager
}
Write-Host "Security Group ID: $GroupId" -ForegroundColor Green

# 4. ECR URI
$EcrUri = aws ecr describe-repositories --repository-names $AppName --query "Repositories[0].RepositoryUri" --output text --no-cli-pager

# 5. Launch Instance
Write-Host "Launching Instance..."
$UserData = @"
#!/bin/bash
dnf update -y
dnf install -y docker
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user
sleep 10
# Create network
docker network create surajhub-net

# Start Postgres
docker run -d \
  --name surajhub-postgres \
  --network surajhub-net \
  --restart always \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=surajhub \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15-alpine

# Wait for Postgres
sleep 10

aws ecr get-login-password --region $Region | docker login --username AWS --password-stdin $EcrUri
TAG=$(aws ecr describe-images --repository-name $AppName --region $Region --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' --output text)

# Start Web App
docker run -d \
  --name surajhub-web \
  --network surajhub-net \
  -p 3000:3000 \
  --restart always \
  -e DATABASE_URL=postgresql://postgres:postgres@surajhub-postgres:5432/surajhub?schema=public \
  -e JWT_SECRET=supersecretkey \
  -e NEXT_TELEMETRY_DISABLED=1 \
  -e HOSTNAME=0.0.0.0 \
  ${EcrUri}:$TAG
"@
$UserDataEncoded = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($UserData))

try {
    $InstanceId = aws ec2 run-instances `
        --image-id $AmiId `
        --count 1 `
        --instance-type $InstanceType `
        --key-name $KeyName `
        --security-group-ids $GroupId `
        --user-data $UserDataEncoded `
        --iam-instance-profile Name=$ProfileName `
        --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$AppName}]" `
        --query "Instances[0].InstanceId" `
        --output text `
        --no-cli-pager

    if ($InstanceId) {
        Write-Host "Instance Launched: $InstanceId" -ForegroundColor Green
        Write-Host "Waiting for running state..."
        aws ec2 wait instance-running --instance-ids $InstanceId --no-cli-pager
        $PublicIp = aws ec2 describe-instances --instance-ids $InstanceId --query "Reservations[0].Instances[0].PublicIpAddress" --output text --no-cli-pager
        
        Write-Host "`n--------------------------------------------------"
        Write-Host "DEPLOYMENT SUCCESSFUL!" -ForegroundColor Cyan
        Write-Host "--------------------------------------------------"
        Write-Host "App URL: http://$PublicIp:3000" -ForegroundColor Yellow
        Write-Host "--------------------------------------------------"
    }
}
catch {
    Write-Error "Failed to launch instance. $_"
}
