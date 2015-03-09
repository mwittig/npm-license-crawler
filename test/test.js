var vows = require('vows'),
    assert = require('assert'),
    DirectoryReader = require('../lib/directoryreader'),
    index = require('../lib/index'),
    tests = {
        loading: {
            topic: function () {
                return index.dumpLicenses;
            },
            'should load callback': function (topic) {
                assert.isFunction(topic);
            }
        },
        reader: {
            topic: function() {
                var reader = new DirectoryReader(".."),
                    result = {
                        found: false,
                        dirs: 0,
                        files: 0
                    },
                    self = this;

                reader.on("file", function (file, stat, fullPath) {
                    result.files++;
                    if (file === "test.js") {
                        result.found = true;
                    }
                    reader.next();
                });
                reader.on("dir", function (dir) {
                    result.dirs++;
                    if (dir === "node_modules") {
                        reader.next();
                    }
                    else {
                        reader.list();
                    }
                });
                reader.on("done", function (error) {
                    self.callback(error, result)
                });
            },
            'should find test file': function (result) {
                assert(result.found);
                assert(result.dirs > 0);
                assert(result.files > 0);
            }
        }
    };

vows.describe('dumplicenses').addBatch(tests).export(module);