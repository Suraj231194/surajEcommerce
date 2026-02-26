# AWS Infrastructure Setup Script for SurajHub

$AppName = "surajhub"
$Region = "us-east-1"
$EcrRepoName = "surajhub"

Write-Host "Starting AWS Setup for $AppName..." -ForegroundColor Cyan

# Check for AWS CLI
if (!(Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Error "AWS CLI is not installed. Please install it first."
    exit 1
}

# Profile Selection
$profiles = aws configure list-profiles
if ($profiles.Count -gt 1) {
    Write-Host "Multiple AWS profiles found. Please select one:" -ForegroundColor Yellow
    for ($i = 0; $i -lt $profiles.Count; $i++) {
        Write-Host "[$i] $($profiles[$i])"
    }
    $selection = Read-Host "Enter the number of the profile to use (default: 0)"
    if ([string]::IsNullOrWhiteSpace($selection)) { $selection = 0 }
    $SelectedProfile = $profiles[$selection]
    $env:AWS_PROFILE = $SelectedProfile
    Write-Host "Using profile: $SelectedProfile" -ForegroundColor Green
}
elseif ($profiles.Count -eq 1) {
    $env:AWS_PROFILE = $profiles[0]
    Write-Host "Using default profile: $($profiles[0])" -ForegroundColor Green
}
else {
    Write-Warning "No AWS profiles found. Please run 'aws configure' first."
    exit 1
}

# 1. Create ECR Repository
Write-Host "Creating ECR Repository: $EcrRepoName..."
try {
    $ecr = aws ecr create-repository --repository-name $EcrRepoName --region $Region --image-scanning-configuration scanOnPush=true | ConvertFrom-Json
    $RepoUri = $ecr.repository.repositoryUri
    Write-Host "ECR Repository Created: $RepoUri" -ForegroundColor Green
}
catch {
    Write-Warning "ECR Repository might already exist or error occurred."
    $RepoUri = "$(aws sts get-caller-identity --query Account --output text).dkr.ecr.$Region.amazonaws.com/$EcrRepoName"
}

# 2. Create IAM Role for App Runner
$RoleName = "AppRunnerInstanceRole-$AppName"
Write-Host "Creating IAM Role: $RoleName..."

$TrustPolicy = @{
    Version   = "2012-10-17"
    Statement = @(
        @{
            Effect    = "Allow"
            Principal = @{
                Service = "build.apprunner.amazonaws.com"
            }
            Action    = "sts:AssumeRole"
        }
    )
} | ConvertTo-Json -Depth 3

try {
    $role = aws iam create-role --role-name $RoleName --assume-role-policy-document $TrustPolicy | ConvertFrom-Json
    $RoleArn = $role.Role.Arn
    Write-Host "IAM Role Created: $RoleArn" -ForegroundColor Green
    
    # Attach policy to allow pulling from ECR
    aws iam attach-role-policy --role-name $RoleName --policy-arn "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
    Write-Host "Attached AWSAppRunnerServicePolicyForECRAccess to role." -ForegroundColor Green
}
catch {
    Write-Warning "Role might already exist. Fetching ARN..."
    $RoleArn = aws iam get-role --role-name $RoleName --query "Role.Arn" --output text
    Write-Host "Using existing Role ARN: $RoleArn" -ForegroundColor Yellow
}

# 3. GitHub Actions Configuration
Write-Host "`n----------------------------------------------------------------"
Write-Host "CONFIGURATION FOR GITHUB ACTIONS" -ForegroundColor Cyan
Write-Host "Add these as 'Repository Secrets' in your GitHub Repo settings:"
Write-Host "----------------------------------------------------------------"
Write-Host "AWS_REGION            : $Region"
Write-Host "ECR_REPOSITORY        : $EcrRepoName"
Write-Host "APP_RUNNER_ROLE_ARN   : $RoleArn"

# 4. IAM User Creation (Optional helper)
Write-Host "`nDo you want to create a dedicated IAM user for GitHub Actions? (y/n)"
$createIam = Read-Host
if ($createIam -eq 'y') {
    $UserName = "github-actions-$AppName"
    try {
        aws iam create-user --user-name $UserName
        aws iam attach-user-policy --user-name $UserName --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess
        aws iam attach-user-policy --user-name $UserName --policy-arn arn:aws:iam::aws:policy/AWSAppRunnerFullAccess
        
        $creds = aws iam create-access-key --user-name $UserName | ConvertFrom-Json
        
        Write-Host "`n!!! SAVE THESE CREDENTIALS NOW !!!" -ForegroundColor Red
        Write-Host "AWS_ACCESS_KEY_ID     : $($creds.AccessKey.AccessKeyId)"
        Write-Host "AWS_SECRET_ACCESS_KEY : $($creds.AccessKey.SecretAccessKey)"
    }
    catch {
        Write-Error "Failed to create user or keys. User might already exist."
    }
}
else {
    Write-Host "Skipping IAM User creation. Ensure you have AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY for a user with sufficient permissions." -ForegroundColor Yellow
}

Write-Host "`nSetup Complete!" -ForegroundColor Green
