'use strict';

var MemoryFileSystem = require("memory-fs");
var fs = new MemoryFileSystem();

module.exports = fs;