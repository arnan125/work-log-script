var fs = require('fs')
var process = require('process')

var log = require('./log.js')
var util = require('./util.js')
var path = require('path')

var root = path.resolve(__dirname, '../')
var logDir = path.resolve(root, 'logs/')

var create = function () {
    var fileInfo = util.generateFile()
    var filepath = path.resolve(logDir, './' + fileInfo.filename) 
    var content = fileInfo.content
    
    try {
        fs.accessSync(logDir)
    } catch(e) {
        fs.mkdirSync(logDir, 0o666)
        var info = `creating folder ${logDir}`
        log(info, 'I')
    }

    try {
        var fd = fs.openSync(filepath, 'ax', 0o666)
        fs.writeSync(fd, content, undefined, 'utf-8')
        fs.closeSync(fd)
        var info = `creating log ${filepath}`
        log(info, 'I')    
    } catch (error) {
        log(error.msg || error, 'E')
    }
}

var run = process.argv.indexOf('-r') > -1

if (run) {
    create()
} else {
    module.exports = create
} 
