var
    path = require('path'),
    filewalker = require('filewalker'),
    checker = require('license-checker'),
    extend = require('jquery-extend'),
    async = require('async'),
    licenses = {},
    dirPaths = [];

// This is a lazy-bone version using file-walker which is easy to use but more time consuming, but it is rather time
// consuming as it traverses the complete directory tree. This could be done a lot smarter. To avoid spending even more
// time by matching regular expression for each file I have decided to write my own sub-string matching functions.

function stringContains(s, substrings) {
    // check if s contains one of the sub-strings
    for (var i=0; i<substrings.length;++i) {
        if (s.indexOf(substrings[i]) > -1) {
            return true;
        }
    }
    return false;
}

function stringEndsWith(s, substrings) {
    // check if s ends with one the sub-strings
    for (var i=0; i<substrings.length;++i) {
        if ((s.length >= substrings[i].length) && s.lastIndexOf(substrings[i]) === (s.length - substrings[i].length)) {
            return true;
        }
    }
    return false;
}

exports.dumpLicenses = function(args, callback) {
    var rootPath = path.resolve(args.start);
    console.log("root path", rootPath);
    filewalker(rootPath)
        .on('file', function(p, s) {
            if (! stringContains(p, [".git", "node_modules"]) && stringEndsWith(p, ["package.json"])) {
                //console.log('Analyzing file: %s, %d bytes', p, s.size);
                dirPaths.push(path.resolve(rootPath, path.dirname(p)));
            }
        })
        .on('error', function(err) {
            console.error(err);
        })
        .on('done', function() {
            async.eachSeries(dirPaths, function (dirPath, iteratorCallback) {
                args.start = dirPath;
                checker.init(args, function(json) {
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
        })
        .walk();
};