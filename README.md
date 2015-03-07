NPM License Crawler
===================

NPM License Crawler is a wrapper around [license-checker] (https://github.com/davglass/license-checker) to analyze
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

Todo
----

* Write proper tests


Build Status
------------

[![Build Status](https://travis-ci.org/mwittig/npm-license-crawler.png?branch=master)](https://travis-ci.org/mwittig/npm-license-crawler)