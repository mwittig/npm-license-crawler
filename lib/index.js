var path = require('path'),
    DirectoryReader = require('./directoryreader'),
    checker = require('license-checker'),
    extend = require('jquery-extend'),
    async = require('async'),
    licenses = {},
    filePaths = [];


exports.dumpLicenses = function(args, callback) {
    var reader = new DirectoryReader(args.start, args.exclude);
    reader
        .on("file", function (file, stat, fullPath) {
            if (file === "package.json") {
                //console.log('Analyzing file: %s, %d bytes', file, stat.size, fullPath);
                filePaths.push(fullPath);
            }
            reader.next();
        })
        .on("dir", function (dir) {
            if ((dir === ".git") || (dir === "node_modules")) {
                reader.next();
            }
            else {
                reader.list();
            }
        })
        .on("done", function (error) {
            if (! error) {
                async.eachSeries(filePaths, function (filePath, iteratorCallback) {
                    args.start = path.dirname(filePath);
                    checker.init(args, function(json) {
                        if (args.dependencies) {
                            var packageDescriptor = require(filePath);
                            var key = packageDescriptor.name + '@' + packageDescriptor.version;
                            if (json.hasOwnProperty(key)) {
                                delete json[key];
                            }
                        }
                        licenses = extend(licenses, json);
                        iteratorCallback();
                    });

                }, function (error) {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        callback(licenses);
                    }
                });
            }
            else {
                console.error(error);
            }
        });
};

