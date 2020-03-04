var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    events = require('events'),
    async = require('async'),
    lstat = process.platform === 'win32' ? 'stat' : 'lstat',
    lstatSync = process.platform === 'win32' ? 'statSync' : 'lstatSync';


module.exports = DirectoryReader;


function DirectoryReader({ start, exclude, silent }) {
    var self = this;
    
    events.EventEmitter.call(self);
    self.dirStack = [];
    self.exclude = exclude || [];
    self.silent = silent;

    process.nextTick(function () {
        try {
            if (typeof self.exclude === "string" || self.exclude instanceof String) {
                self.exclude = [ path.resolve(self.exclude) ]
            }
            for (var i=0; i < self.exclude.length; ++i) {
                self.exclude[i] = path.resolve(self.exclude[i]);
                var stat = fs.lstatSync(self.exclude[i]);
                if (! stat.isDirectory()) {
                    throw new Error("Path " + self.exclude[i] + " is not a directory");
                }
            }
        }
        catch (error) {
            self.emit("done", new Error(error.message));
            return;
        }


        if (typeof start === "string" || start instanceof String) {
            start = [ path.resolve(start ||'.') ]
        }
        async.eachSeries(start, function(dir, dirIterator) {
            self.currentFilePath = path.resolve(dir);

            if (! self._isExcludedDir()) {
                if (!self.silent) {
                    console.log("include dir", self.currentFilePath);
                }
                self._pushDir(dirIterator, dirIterator);
            }
            else {
                if (!self.silent) {
                    console.log("exclude dir", self.currentFilePath);
                }
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
    var exclude = this.exclude,
        dir = path.resolve(this.currentFilePath);

    for (var i=0; i<exclude.length;++i) {
        if (dir.indexOf(exclude[i]) === 0) {
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
                        if (!self.silent) {
                            console.log("exclude dir", self.currentFilePath);
                        }
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

