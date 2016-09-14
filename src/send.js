var fs = require('fs')
var process = require('process')
var nodemailer = require('nodemailer')       // https://github.com/nodemailer/nodemailer
var markdown = require('markdown').markdown  // https://github.com/evilstreak/markdown-js
var path = require('path')

var util = require('./util.js')
var log = require('./log.js')
var config = require('./config.js')

var root = path.resolve(__dirname, '../')
var logDir = path.resolve(root, 'logs/')

var run = process.argv.indexOf('-r') > -1
var date = process.argv.indexOf('-d') > -1 && process.argv[process.argv.indexOf('-d')+1] || undefined

// config
config.contentOptions = config.contentOptions || {} 
config.transporterOptions = config.transporterOptions || {}
config.mailOptions = config.mailOptions || {}

var send = function () {
    var filename = util.generateFile(date).filename
    var filepath = path.resolve(logDir, './' + filename)
    var content
    try {
        content = fs.readFileSync(filepath, 'utf8')    
    } catch (error) {
        log(error.msg || error,'E')
        return 
    }

    // verify
    var verifyReg = (function(){
        var reg = config.contentOptions.verifyReg
        if(typeof reg === 'object') return reg
        var regStr = reg || '^([\\s\\S]*?)周一([\\s\\S]*?)周二([\\s\\S]*?)周三([\\s\\S]*?)周四([\\s\\S]*?)周五([\\s\\S]*?)$'
        reg = new RegExp(regStr)
    })()
    var verify = verifyReg.test(content)
    var msg = `${filepath} verified success,wait to send...`
    if (run) {
        msg = `${filepath} skip verifing, wait to send...`
    }else if (!verify) {
        msg = `${filepath} verified fail, abort sending...`
        log(msg, 'W')
        return
    }
    log(msg, 'I')

    
    // mail content 
    var mailContent = (function () {
        var _header = config.contentOptions.mailHeader || ''
        var _content = content
        var _footer = config.contentOptions.mailFooter || ''
        var _rawStr = `${_header}\n\r${_content}\n\r${_footer}\n\r`
        return config.contentOptions.parseMD ? markdown.toHTML(_rawStr) : _rawStr
    }())
    
    // mail sending

    var transporterOptions = Object.assign({
        host: 'smtp.mxhichina.com',
        port: 25,
    }, config.transporterOptions)

    var mailOptions = Object.assign({
        subject: filename.replace(/^log_(\d+)_(\d+)_(\d+)_(\d+)_(\d+)\.md$/, '周报 $2月$3日 -- $4月$5日'),
        html: mailContent.replace(/[\n\r]+/g, '<br>'),
    }, (
        !config.mailOptions.subject && delete config.mailOptions.subject,
        config.mailOptions
    ))
    
    var transporter = nodemailer.createTransport(transporterOptions)
    
    transporter.verify(function (error, success) {
        if (error) {
            log(error, 'E');
        } else {
            log('Server is ready to take our messages', 'I');

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) return log(error, 'E')
                log(`Message sent: \n\r${mailContent}`, 'I')
                
            })
        }
    });
}



if (run) {
    send()
} else {
    module.exports = send
} 