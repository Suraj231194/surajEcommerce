const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles('./src');

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    content = content.replace(/(import|export)\s+(?:[\s\S]*?from\s+)?["'](@\/[^"']+)["']/g, (match, type, importPath) => {
        if (importPath.startsWith('@/')) {
            const targetPath = path.join(process.cwd(), 'src', importPath.substring(2));
            let relativePath = path.relative(path.dirname(filePath), targetPath);

            // Ensure it starts with ./ or ../
            if (!relativePath.startsWith('.')) {
                relativePath = './' + relativePath;
            }

            // Normalize separators to forward slashes
            relativePath = relativePath.split(path.sep).join('/');

            modified = true;
            return match.replace(importPath, relativePath);
        }
        return match;
    });

    if (modified) {
        console.log(`Replaced aliases in: ${filePath}`);
        fs.writeFileSync(filePath, content);
    }
});

console.log('Alias replacement complete!');
