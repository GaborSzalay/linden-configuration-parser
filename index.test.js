'use strict';

const lindenConfigurationParser = require('./index');

describe('lindenConfigurationParser', function() {

    it('should parse configuration', () => {
        let expectedConfigFile  = {
            cases: [
                {
                    isValid: true,
                    name: "testName",
                    url: "testUrl",
                    viewport: {
                        "height": 768,
                        "width": 900
                    }
                }
            ],
            cwd: process.cwd(),
            dir: "./testDir",
            timestamp: "will be copied from actual lindenConfigurationParser"
        };

        let actualConfigFile = lindenConfigurationParser('test-linden-configuration.json');
        expectedConfigFile.timestamp = actualConfigFile.timestamp;

        expect(actualConfigFile).toEqual(expectedConfigFile);
    });
});
