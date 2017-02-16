'use strict';

/* eslint-env jest */
jest.mock('fs');
jest.mock('linden-fs-helper');

const fs = require.requireMock('fs');
const helper = require.requireMock('linden-fs-helper');
const mockDate = require('mockdate');

const lindenConfigurationParser = require('./index');

describe('lindenConfigurationParser', function() {

    it('should parse configuration into custom directory', () => {
        let testConfig = {
            dir: "./testDir",
            cases: [
                {
                    name: "testName",
                    url: "testUrl",
                    viewport: {
                        height: 768,
                        width: 900
                    }
                }
            ]
        }
        let expectedParsedConfig  = {
            cwd: 'testCWD',
            dir: "./testDir",
            timestamp: "1434319925275",
            cases: [
                {
                    isValid: true,
                    name: "testName",
                    url: "testUrl",
                    viewport: {
                        height: 768,
                        width: 900
                    }
                }
            ]
        };
        setUpReturnValues(testConfig);

        let actualParsedConfig = lindenConfigurationParser('test-linden-configuration.json');

        mockDate.reset();
        expectCommonCalls(actualParsedConfig, expectedParsedConfig);
    });

    it('should parse configuration into default directory', () => {
        let testConfigWithoutDirectory = {
            cases: [
                {
                    name: "testName",
                    url: "testUrl",
                    viewport: {
                        height: 768,
                        width: 900
                    }
                }
            ]
        }
        let expectedParsedConfig  = {
            cwd: 'testCWD',
            dir: "./linden",
            timestamp: "1434319925275",
            cases: [
                {
                    isValid: true,
                    name: "testName",
                    url: "testUrl",
                    viewport: {
                        height: 768,
                        width: 900
                    }
                }
            ]
        };
        setUpReturnValues(testConfigWithoutDirectory);

        let actualParsedConfig = lindenConfigurationParser('test-linden-configuration.json');

        mockDate.reset();
        expectCommonCalls(actualParsedConfig, expectedParsedConfig);
    });

    it('should handle invalid config input', () => {
        let actualParsedConfig = lindenConfigurationParser(false);
        expect(actualParsedConfig).toBe(false);
    });

    function setUpReturnValues(testConfig) {
        helper.getCWD.mockReturnValueOnce('testCWD');
        fs.readFileSync.mockReturnValueOnce(JSON.stringify(testConfig));
        helper.folderExists.mockReturnValue(false);
        mockDate.set(1434319925275);
    }

    function expectCommonCalls(actualParsedConfig, expectedParsedConfig) {
        expect(actualParsedConfig).toEqual(expectedParsedConfig);
        expect(helper.folderExists).toHaveBeenCalledWith('testCWD\\testDir');
        expect(fs.mkdirSync).toHaveBeenCalledWith('testCWD\\testDir');
        expect(fs.mkdirSync).toHaveBeenCalledWith('testCWD\\testDir\\1434319925275');
    }
});
