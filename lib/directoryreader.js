var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    events = require('events'),
    async = require('async'),
    lstat = process.platform === 'win32' ? 'stat' : 'lstat',
    lstatSync = process.platform === 'win32' ? 'statSync' : 'lstatSync';


module.exports = DirectoryReader;


function DirectoryReader(dirs, excludeDirs) {
    var self = this;

    events.EventEmitter.call(self);
    self.dirStack = [];
    self.excludeDirs = excludeDirs || [];

    process.nextTick(function () {
        try {
            if (typeof self.excludeDirs === "string" || self.excludeDirs instanceof String) {
                self.excludeDirs = [ path.resolve(self.excludeDirs) ]
            }
            for (var i=0; i < self.excludeDirs.length; ++i) {
                self.excludeDirs[i] = path.resolve(self.excludeDirs[i]);
                var stat = fs.lstatSync(self.excludeDirs[i]);
                if (! stat.isDirectory()) {
                    throw new Error("Path " + self.excludeDirs[i] + " is not a directory");
                }
            }
        }
        catch (error) {
            self.emit("done", new Error(error.message));
            return;
        }


        if (typeof dirs === "string" || dirs instanceof String) {
            dirs = [ path.resolve(dirs ||'.') ]
        }
        async.eachSeries(dirs, function(dir, dirIterator) {
            self.currentFilePath = path.resolve(dir);

            if (! self._isExcludedDir()) {
                console.log("include dir", self.currentFilePath);
                self._pushDir(dirIterator, dirIterator);
            }
            else {
                console.log("exclude dir", self.currentFilePath);
                dirIterator();
            }
        },
        function complete(error) {
            if (error) {
                self.emit("done", error);
            }
            else {
                self.next();
            }
        });
    });
}
util.inherits(DirectoryReader, events.EventEmitter);


DirectoryReader.prototype._pushDir = function(nextCB, errorCB) {
    var self = this,
        dir = self.currentFilePath;

    fs.readdir(dir, function(error, list) {
        if (error) {
            if (errorCB) {
                errorCB(error);
            }
            else {
                self.emit("done", error);
            }
        }
        else {
            self.dirStack.push({dir: dir, list: list, iterator: 0});

            if (nextCB) {
                nextCB();
            }
        }
    });
    return self;
};


DirectoryReader.prototype._cwd = function() {
    var length = this.dirStack.length;
    if (length > 0) {
        return this.dirStack[length - 1]
    }
    return null;
};


DirectoryReader.prototype._isExcludedDir = function() {
    var excludeDirs = this.excludeDirs,
        dir = this.currentFilePath;

    for (var i=0; i<excludeDirs.length;++i) {
        if (dir.indexOf(excludeDirs[i]) === 0) {
            return true;
        }
    }
    return false;
};


DirectoryReader.prototype.next = function() {
    var self = this;

    if (self._cwd() === null) {
        self.emit("done");
    }
    else {
        var file = self._cwd().list[self._cwd().iterator++];

        if (! file) {
            self.dirStack.pop();
            if (self.dirStack.length === 0) {
                self.emit("done");
            }
            else {
                self.next();
            }
        }
        else {
            self.currentFilePath = self._cwd().dir + '/' + file;
            fs[lstat](self.currentFilePath, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    if (! self._isExcludedDir()) {
                        self.emit("dir", file, stat, self.currentFilePath);
                    }
                    else {
                        console.log("exclude dir", self.currentFilePath);
                        self.next();
                    }
                }
                else {
                    self.emit("file", file, stat, self.currentFilePath);
                }
            });
        }
    }
};


DirectoryReader.prototype.list = function() {
    var self = this;

    self._pushDir(function () {
        self.next();
    });
};

