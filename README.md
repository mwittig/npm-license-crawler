NPM License Crawler
===================

[![npm version](https://badge.fury.io/js/npm-license-crawler.svg)](http://badge.fury.io/js/npm-license-crawler)

NPM License Crawler is a wrapper around [license-checker](https://github.com/davglass/license-checker) to analyze
several node packages (package.json files) as part of your software project. This way, it is possible to create a list
of third party licenses for your software project in one go. File paths containing ".git" or "node_modules" are ignored
at the stage where 'package.json' files are matched to provide the entry points to calling license-checker. 

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

* `--json /path/to/save.json`: export data as JSON to the given file. 
    The path will be created if it does not exist.

* `--csv /path/to/save.csv`: export the data as comma-separated values to the given file. 
    The path will be created if it does not exist.

Example
-------

    npm-license-crawler  --exclude ./lib/logging --dependencies --csv licenses.csv
    
Using npm-license-crawler programmatically
------------------------------------------

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

* 20141120, V0.0.1
    * Initial Version
    
* 20141121, V0.0.2
    * Synced & merged license-checker fork with upstream
    * Result is now sorted
    * Fixed --dependencies option which only returned partial results

* 20141215, V0.0.3
    * Implemented DirectoryReader replacing FileWalker to speed up the directory traversal and to add new functionality
    * Accepts a list of directory paths by using --start option multiple times
    * Added --exclude option to add one or multiple directory path to exclude from the search

* 20141215, V0.0.4
    * Added test skeleton and the basic mechanic to run tests and a coverage analysis
    * Added travis build and info on build status as part of README
    * Added TODO section

* 20150115, V0.0.5
    * Clarified use of --unknown option. See also license-checker issue #29 <https://github.com/davglass/license-checker/issues/29>
    * Patched license-checker branch to fix --unknown error
    * Added feature to output the parent path of dependencies for each module
    * Fixed and extended normalization of the repository URL. See also license-checker issue #30 <https://github.com/davglass/license-checker/issues/30>
    * Add output of license URL where applicable

* 20150307, V0.0.6
    * Renamed to npm-license-crawler
    * Updated README
    * Renamed binary
    * npm publish

* 20150309, V0.0.7
    * Extended package description
    * Corrected link syntax in README

* 20150414, V0.0.8
    * Changed API of dumpLicenses() callback to improve programmatic use 
    * Sorting and file output are now done as part of dumpLicenses()
    
* 20150423, V0.0.9
    * Updated dependencies
    * Added version badge
    * Added usage example
    
* 20150810, V0.1.0
    * Reset variables to allow for multiple calls of dumpLicenses function (thanks @Kienz)
    * Revised license information to provide a SPDX 2.0 license identifier in-line with npm v2.1 guidelines on 
      license metadata - see also https://github.com/npm/npm/releases/tag/v2.10.0

* 20160106, V0.1.1
    * Added hidden option for gulp integration
    * Added example file
    * Corrected license info as part of package descriptor
    
* 20160116, V0.1.2
    * Changed line endings to LF for command wrapper on published files to resolve 
      issue #2 for OS X users, thanks @swashcap and @uglow
    * Added travis build descriptor

* 20160311, V0.1.3
    * Updated dependencies

Todo
----

* Write proper tests


Build Status
------------

[![Build Status](https://travis-ci.org/mwittig/npm-license-crawler.png?branch=master)](https://travis-ci.org/mwittig/npm-license-crawler)