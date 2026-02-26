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

    // Regex to find imports that don't have extensions
    // Matches: import ... from "..." or export ... from "..."
    // Captures the path
    content = content.replace(/(import|export)\s+(?:[\s\S]*?from\s+)?["']([^"']+)["']/g, (match, type, importPath) => {
        // Skip if already has extension or is a package
        if (importPath.endsWith('.js') || importPath.endsWith('.jsx') || importPath.endsWith('.css') || importPath.endsWith('.json')) {
            return match;
        }

        // Check if it's a local import
        if (importPath.startsWith('.') || importPath.startsWith('@/')) {
            // Try to find the file
            let absolutePath;
            if (importPath.startsWith('@/')) {
                absolutePath = path.join(process.cwd(), 'src', importPath.substring(2));
            } else {
                absolutePath = path.join(path.dirname(filePath), importPath);
            }

            if (fs.existsSync(absolutePath + '.jsx')) {
                modified = true;
                return match.replace(importPath, importPath + '.jsx');
            } else if (fs.existsSync(absolutePath + '.js')) {
                modified = true;
                return match.replace(importPath, importPath + '.js');
            }
        }

        return match;
    });

    if (modified) {
        console.log(`Fixed imports in: ${filePath}`);
        fs.writeFileSync(filePath, content);
    }
});

console.log('Import fix complete!');
