var fs = require('fs')
var path = require('path')
var log = require('./log.js')

var root = path.resolve(__dirname, '../')
var filepath = path.resolve(root, 'src/', 'config.js')

var str =
`module.exports = {
    // required
    mailOptions: {
        from: '"难" <me@mailsever.com>',  // seted like this format
        to: 'other@mailsever.com',
        subject: '',   // default 周报 mm月dd日 -- mm月dd日 
    },
    // required
    transporterOptions:{
        host: 'smtp.mxhichina.com',
        port: 25,
        secure: false,  // ssl seems not support by server smtp.mxhichina.com
        auth: {
            user: 'user@mail.sever',
            pass: '*******',
        }
    },
    contentOptions: {
        mailHeader: '## hi someone',
        mailFooter: 'arnan',
        parseMD: true,  // parsing markdown file to html or not
        verifyReg: '',   // verify mail content using a reg expression, default /^([\s\S]*?)周一([\s\S]*?)周二([\s\S]*?)周三([\s\S]*?)周四([\s\S]*?)周五([\s\S]*?)$/ 
    },
    scheduleOptions: {
        logCreate: '',  // 'cron' string, default '0 8 * * 1' in Monday morning
        logSend: '',    // 'cron' string, default '30 20 * * 5' 20:30 on Friday
        // randomDelyRange: 30 * 60, // s,  default half an hour 
    }
}`

try {
    var fd = fs.openSync(filepath, 'ax', 0o777)
    fs.writeSync(fd, str, undefined, 'utf-8')
    fs.closeSync(fd)
    var info = `creating config ${filepath}`
    log(info, 'I')
} catch (error) {
    log(error.msg || error, 'E')
}
