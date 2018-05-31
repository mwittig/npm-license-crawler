# Release History

* 20180531, V0.1.9
    * Handle @-named dependencies properly with --onlyDirectDependencies, issue #20 (thanks @jamiemjennings)
    * Updated dependencies

* 20180224, V0.1.8
    * Fix for type error when using --onlyDirectDependencies on project with dependencies, issue #18 (thanks @DrGruby)
    
* 20180220, V0.1.7
    * Added missing command line option handlers for --omitVersion and --onlyDirectDependencies
    * Revised README
    
* 20180219, V0.1.6
    * Added option --onlyDirectDependencies to show only direct dependencies licenses, Issue #10 (thanks @elenabratanova)
    * Added option --omitVersion to omit version numbers in output, Issue #14 (thanks @elenabratanova)
    * Updated dependencies
    
* 20161206, V0.1.5
    * Added feature to output the relative license file path, Issue #8
    * Updated dependencies
    * Externalized change history
    
* 20160419, V0.1.4
    * Fixed CSV header line missing quotes for "license URL" column header, Issue #4

* 20160311, V0.1.3
    * Updated dependencies
    
* 20160116, V0.1.2
    * Changed line endings to LF for command wrapper on published files to resolve 
      issue #2 for OS X users, thanks @swashcap and @uglow
    * Added travis build descriptor
    
* 20160106, V0.1.1
    * Added hidden option for gulp integration
    * Added example file
    * Corrected license info as part of package descriptor
    
* 20150810, V0.1.0
    * Reset variables to allow for multiple calls of dumpLicenses function (thanks @Kienz)
    * Revised license information to provide a SPDX 2.0 license identifier in-line with npm v2.1 guidelines on 
      license metadata - see also https://github.com/npm/npm/releases/tag/v2.10.0

* 20150423, V0.0.9
    * Updated dependencies
    * Added version badge
    * Added usage example
    
* 20150414, V0.0.8
    * Changed API of dumpLicenses() callback to improve programmatic use 
    * Sorting and file output are now done as part of dumpLicenses()
    
* 20150309, V0.0.7
    * Extended package description
    * Corrected link syntax in README

* 20150307, V0.0.6
    * Renamed to npm-license-crawler
    * Updated README
    * Renamed binary
    * npm publish
    
* 20150115, V0.0.5
    * Clarified use of --unknown option. See also license-checker issue #29 <https://github.com/davglass/license-checker/issues/29>
    * Patched license-checker branch to fix --unknown error
    * Added feature to output the parent path of dependencies for each module
    * Fixed and extended normalization of the repository URL. See also license-checker issue #30 <https://github.com/davglass/license-checker/issues/30>
    * Add output of license URL where applicable
    
* 20141215, V0.0.4
    * Added test skeleton and the basic mechanic to run tests and a coverage analysis
    * Added travis build and info on build status as part of README
    * Added TODO section
    
* 20141215, V0.0.3
    * Implemented DirectoryReader replacing FileWalker to speed up the directory traversal and to add new functionality
    * Accepts a list of directory paths by using --start option multiple times
    * Added --exclude option to add one or multiple directory path to exclude from the search

* 20141121, V0.0.2
    * Synced & merged license-checker fork with upstream
    * Result is now sorted
    * Fixed --dependencies option which only returned partial results
    
* 20141120, V0.0.1
    * Initial Version