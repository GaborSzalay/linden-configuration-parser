'use strict';

const fs    = require('fs');
const path  = require('path');

module.exports.folderExists = folderName => {
    try {
        return fs.statSync(folderName).isDirectory();
    } catch (err) {
        return false;
    }
};

module.exports.getCWD = () => {
    return process.cwd();
};

module.exports.getBasePath = () => {
    return process.argv[1];
};
