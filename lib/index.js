var path = require('path'),
    DirectoryReader = require('./directoryreader'),
    checker = require('license-checker'),
    extend = require('jquery-extend'),
    async = require('async'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    treeify = require('treeify');


exports.dumpLicenses = function(args, callback) {
    var reader = new DirectoryReader(args.start, args.exclude),
        licenses = {},
        filePaths = [];
    const onlyDirectDependenciesFilter = {};
    reader
        .on("file", function (file, stat, fullPath) {
            if (file === "package.json") {
                //console.log('Analyzing file: %s, %d bytes', file, stat.size, fullPath);
                filePaths.push(fullPath);
                if (args.onlyDirectDependencies) {
                    var packageJsonContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                    if(packageJsonContents.dependencies && packageJsonContents.name){
                        onlyDirectDependenciesFilter[packageJsonContents.name] = Object.keys(packageJsonContents.dependencies);
                    }
                }
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
                        console.log(error);
                    }
                    else {
                        var result = {};
                        
                        Object.keys(licenses).sort().forEach(function(item) {
                            var license = licenses[item];
                            if (license) {
                                if (args.onlyDirectDependencies) {
                                    var packageName = item.substring(0, item.lastIndexOf("@"))
                                    if (!onlyDirectDependenciesFilter[license.parents] || onlyDirectDependenciesFilter[license.parents].indexOf(packageName) == -1) {
                                        return;
                                    }
                                }
                                var resultKey = args.omitVersion ? item.split("@")[0] : item;
                                result[resultKey] = license;
                            }
                        });

                        var dir;
                        if (args.json || args.csv) {
                            // out put to file
                            if (args.json) {
                                dir = path.dirname(args.json);
                                mkdirp.sync(dir);
                                fs.writeFileSync(args.json, JSON.stringify(result, null, 4) + '\n', 'utf8');
                                console.log('file written', args.json);
                            }
                            if (args.csv) {
                                dir = path.dirname(args.csv);
                                mkdirp.sync(dir);
                                fs.writeFileSync(args.csv, checker.asCSV(result, args), 'utf8');
                                console.log('file written', args.csv);
                            }
                        }
                        else if (! args.gulp) {
                            checker.print(result);
                        }
                        console.log("Number of entries found:", Object.keys(result).length);
                    }
                    if (! error && args.gulp) {
                        callback(error, treeify.asTree(result, true));
                    }
                    else {
                        callback(error, result);
                    }
                });
            }
            else {
                console.error(error);
                callback(error, licenses);
            }
        });
};

