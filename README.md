Dump Licenses
=============

t.b.d.

This project is still in its infancy.

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