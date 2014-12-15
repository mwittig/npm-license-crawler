var vows = require('vows'),
    assert = require('assert'),
    index = require('../lib/index'),
    tests = {
        loading: {
            topic: function () {
                return index.dumpLicenses;
            },
            'should load callback': function (topic) {
                assert.isFunction(topic);
            }
        }
    };

vows.describe('dumplicenses').addBatch(tests).export(module);
