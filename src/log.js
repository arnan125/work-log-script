var fs = require('fs')
var util = require('./util.js')
var path = require('path')

var root = path.resolve(__dirname, '../')

var log = function (str, type) {
    str = `${util.format(new Date())} : [${type ? type : 'N/A'}] ${str}\r\n`
    
    var filePath = path.resolve(root, './log.md')
    
    var fd = fs.openSync(filePath, 'a', 0o666)
    fs.writeSync(fd, str, undefined, "utf8")
    fs.closeSync(fd)
    console.log(str)
}

module.exports = log