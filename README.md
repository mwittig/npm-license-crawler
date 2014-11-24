Dump Licenses
=============

This project is still in its infancy. 

Basically, Dump License is a wrapper around [license-checker] (https://github.com/davglass/license-checker) to analyze 
several modules (package.json files) as part of your software project. This way, it is possible to create a list of 
third party licenses for your software project in one go. File paths containing ".git" or "node_modules" are ignored 
at the stage where 'package.json' files are matched to provide the entry points to calling license-checker. 

Installation
------------

At this stage installation from tarball is supported, only.

    npm i https://github.com/mwittig/dumplicenses/archive/master.tar.gz -g

Options
-------

* `--start directory-path`: path to the directory the license search should start from. 
    If omitted the current working directory is assumed.

* `--unknown`: show only licenses that can't be determined or have been guessed.

* `--dependencies`: show only third-party licenses, i.e., only list the dependencies defined in package.json.

* `--json /path/to/save.json`: export data as JSON to the given file. 
    The path will be created if it does not exist.

* `--csv /path/to/save.csv`: export the data as comma-separated values to the given file. 
    The path will be created if it does not exist.

Known Issues
------------

* Using the tool on large directory trees is slow as the complete directory tree will be traversed.

History
-------

* 20141120, V0.0.1
    * Initial Version
    
* 20141121, V0.0.2
    * Synced & merged license-checker fork with upstream
    * Result is now sorted
    * Fixed --dependencies option which only returned partial results