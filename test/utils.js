const fs = require('fs');
const BlueBird = require('bluebird');
const rmdir = require('rimraf');

const readFile = (path, transformJSON) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            if (err) reject(err);
            else resolve(
                transformJSON ?
                    JSON.parse(data) :
                    data);
        })
    });
};

const cleanUpAutoGeneratedFiles = (dirs, rootPath) => {
    return BlueBird.map(dirs, (dir) => {
        return new Promise((resolve, reject) => {
            rmdir(rootPath + dir, err => {
                if (err && err.code === 'ENOENT') resolve();
                else if (err) reject(err);
                else resolve();
            });
        })
    });
};

const checkDir = (path) => {
    return new Promise((resolve, reject) => {
        fs.access(path, (err) => {
            if(err) reject(err);
            else resolve()
        })
    })
}


module.exports = {
    cleanUp: cleanUpAutoGeneratedFiles,
    checkDir,
    readFile
};