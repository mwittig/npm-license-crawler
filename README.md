NPM License Crawler
===================

[![npm version](https://badge.fury.io/js/npm-license-crawler.svg)](http://badge.fury.io/js/npm-license-crawler)

NPM License Crawler is a wrapper around [license-checker](https://github.com/davglass/license-checker) to analyze
several node packages (package.json files) as part of your software project. This way, it is possible to create a list
of third party licenses for your software project in one go. File paths containing ".git" or "node_modules" are ignored
at the stage where 'package.json' files are matched to provide the entry points to calling license-checker. 

Contributions
-------------

If you like npm-license-crawler, please consider &#x2605; starring 
[the project on github](https://github.com/mwittig/npm-license-crawler). Contributions to the project are  welcome. 
You can simply fork the project and create a pull request with your contribution to start with. 

Installation
------------

Use global installation to be able to run npm-license-crawler from the command line.

    npm i npm-license-crawler -g

Options
-------

* `--start directory-path`: path to the directory the license search should start from. 
    If omitted the current working directory is assumed.

* `--exclude directory-path`: path to a directory to be excluded (and its subdirectories) from the search.

* `--unknown`: show only licenses that can't be determined or have been guessed.

* `--dependencies`: show only third-party licenses, i.e., only list the dependencies defined in package.json.

* `--onlyDirectDependencies`: show only direct dependencies licenses, i.e., don't list dependencies of dependencies.

* `--omitVersion`: omit version numbers in result (e.g. "npm-license-crawler@0.1.5" becomes "npm-license-crawler")

* `--relativeLicensePath`: output the relative file path for license files.

* `--json /path/to/save.json`: export data as JSON to the given file. 
    The path will be created if it does not exist.

* `--csv /path/to/save.csv`: export the data as comma-separated values to the given file. 
    The path will be created if it does not exist.

Example
-------

    npm-license-crawler  --exclude ./lib/logging --dependencies --csv licenses.csv
    
Using npm-license-crawler API
-----------------------------

See the following example.

    var crawler = require('npm-license-crawler'),
        options = {
            start: ['../..'],
            exclude: ['.'],
            json: 'licenses.json',
            unknown: true
        };
    
    crawler.dumpLicenses(options,
        function(error, res){
            if (error) {
                console.error("Error:", error);
            }
            else {
                console.dir(res);
            }
        }
    );

History
-------

See [Release History](https://github.com/mwittig/npm-license-crawler/blob/master/HISTORY.md).

Build Status
------------

[![Build Status](https://travis-ci.org/mwittig/npm-license-crawler.png?branch=master)](https://travis-ci.org/mwittig/npm-license-crawler)