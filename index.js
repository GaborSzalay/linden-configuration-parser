'use strict';

const fs            = require('fs');
const path          = require('path');
const helper        = require('./helper');
const isNotEmpty    = require('is-not-empty');

function validateCase(testCase) {
    // TODO: Should handle viewport width/height as well
    if (!testCase || !testCase.name || !testCase.url || !isNotEmpty.object(testCase.viewport)) {
        return false;
    }

    return true;
}

function parseConfiguration(config) {
    let tempConfig  = {
        cases: []
    };

    if (!isNotEmpty.array(config.cases)) return tempConfig;

    tempConfig.timestamp    = Date.now().toString();
    tempConfig.cwd          = helper.getCWD();
    tempConfig.dir          = config.dir ? config.dir : './linden';

    config.cases.forEach((testCase) => {
        testCase.isValid = validateCase(testCase);
        tempConfig.cases.push(testCase);
    });

    let savePathRoot = path.join(helper.getCWD(), tempConfig.dir);
    let savePath     = path.join(savePathRoot, tempConfig.timestamp);

    if (!helper.folderExists(savePathRoot)) {
        fs.mkdirSync(savePathRoot);
    }

    fs.mkdirSync(savePath);
    return tempConfig;
}

module.exports = configFileName => {
    if (!configFileName) return false;

    let config = JSON.parse(fs.readFileSync(configFileName, 'utf8'));
    return parseConfiguration(config);
};