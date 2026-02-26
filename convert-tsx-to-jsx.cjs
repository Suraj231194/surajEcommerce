const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.tsx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const tsxFiles = getAllFiles('./src');

tsxFiles.forEach(filePath => {
    console.log(`Converting: ${filePath}`);
    const source = fs.readFileSync(filePath, 'utf8');

    const result = ts.transpileModule(source, {
        compilerOptions: {
            jsx: ts.JsxEmit.Preserve,
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
            removeComments: false
        }
    });

    const newFilePath = filePath.replace('.tsx', '.jsx');
    fs.writeFileSync(newFilePath, result.outputText);
    fs.unlinkSync(filePath);
    console.log(`Created: ${newFilePath}`);
});

console.log('Conversion complete!');
