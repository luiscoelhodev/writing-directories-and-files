const fs = require('fs').promises;
const dataStore = require('./data-store');

const writeJSON = async (dirPath, file) => {
    const fileJSON = JSON.stringify(file)
    
    try {
        await fs.writeFile(dirPath, fileJSON, {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        })    
    } catch (error) {
        throw new Error('Invalid Data')
    }
};

const createDirectoryIfNotExists = async (dirPath) => {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        console.error(`Got an error trying to create the folder: the path ${dirPath} already exists.`);
    }
    if (dirPath) {
        return console.log();
    }
};

createDirectoryIfNotExists('./folder1')
writeJSON('./folder1/file2.txt', dataStore) // writes js file as a JSON in file2.txt
//writeJSON('./folder1/file1.txt', undefined); // throws an error

module.exports = {
    // Do not modify the names of the exports
    writeJSON: writeJSON,
    createDirectoryIfNotExists: createDirectoryIfNotExists
};
