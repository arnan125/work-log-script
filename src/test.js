var process = require('process')
var schedule = require('node-schedule')  // https://github.com/node-schedule/node-schedule
var markdown = require('markdown').markdown
var path = require('path')
var assert = require('assert')
var parser = require('cron-parser')

var util = require('./util.js')
var log = require('./log.js')
var create = require("./create.js")
var send = require("./send.js")

;;
function testing (fn) {
    var args = Array.prototype.slice.call(arguments, 1)
    console.log(args[args.length-1])
    args.map(function(item, index) {
        index !== args.length-1 && console.log('\n\r' + index + ':' + item)
    })
    
    typeof fn === 'function' && fn.apply(null, args)
}
;;
///////////////////////////////////////////////
////////       util test        ///////////////
///////////////////////////////////////////////
(function () {
    var msg = '获取指定日期周内第n天'
    testing(assert.deepEqual, util.getThisDayWeekNthDay(new Date('2010/02/12'), 0), new Date('2010/02/7'), msg+'0')
    testing(assert.deepEqual, util.getThisDayWeekNthDay(new Date('2017/10/21'), 3), new Date('2017/10/18'), msg+'1')
    testing(assert.deepEqual, util.getThisDayWeekNthDay('2007/04/16', 6), new Date('2007/04/21'), msg+'2')    
}())
;;
(function () {
    var msg = '获取当前日期周内第n天'
    testing(assert.deepEqual, util.getThisWeekNthDay(0), util.getThisDayWeekNthDay(new Date(), 0), msg+'0')
    testing(assert.deepEqual, util.getThisWeekNthDay(6), util.getThisDayWeekNthDay(new Date(), 6), msg+'1')
    testing(assert.deepEqual, util.getThisWeekNthDay(3), util.getThisDayWeekNthDay(new Date(), 3), msg+'2')    
}())  
;;
(function () {
    var msg = '获取当前日期周内第1天（周日）'
    testing(assert.deepEqual, util.getThisWeekFirstDay(), util.getThisWeekNthDay(0), msg)
}())
;;
(function () {
    var msg = '获取当前日期周内最后1天（周六）'
    testing(assert.deepEqual, util.getThisWeekLastDay(), util.getThisWeekNthDay(6), msg)
}())
;;
(function () {
    var msg = '格式化日期'
    testing(assert.equal, util.format(new Date('2016/05/23 21:23:15'), ''), '2016-05-23 21:23:15', msg+'0')
    testing(assert.equal, util.format(new Date('2016/05/23 21:23:15'), 'yy/MM/dd hh:mm'), '16/05/23 21:23', msg+'1')
    testing(assert.equal, util.format(new Date('2016/05/23 21:23:15'), 'MM/dd/yyyy hh:mm:ss'), '05/23/2016 21:23:15', msg+'2')
}())
;;
(function () {
    var msg = '生成文件信息'
    var fileInfo = util.generateFile()
    testing(assert, /^log_(\d{4})(_(\d{1,2})){4}\.md$/.test(fileInfo.filename) , 'filename:' + msg+'0')
    testing(assert, /^## 周报\((\d{1,2}\.\d{1,2}) - (\d{1,2}\.\d{1,2})\)[\r\n]*$/.test(fileInfo.content) , 'content:' + msg+'1')
}())
;;
///////////////////////////////////////////////
////////       log test        ///////////////
///////////////////////////////////////////////

// find logs in the log.md file and check the std output 
log('log test')
log('log test with log type', 'I')

///////////////////////////////////////////////
////////       send test        ///////////////
///////////////////////////////////////////////

// check if there is a mail send to the mail specified in the config file
// watch out：you must make sure your work log can pass the verifying at first   
send()

///////////////////////////////////////////////
////////       create test        ///////////////
///////////////////////////////////////////////

// check if there is a file named just like 'log_2016_8_14_8_20.md' being created in folder '../logs'
create()

///////////////////////////////////////////////
////////       schedule test    ///////////////
///////////////////////////////////////////////
;;
(function () {
    // run the task every min 
    console.log('run the task every min..., until doing it for 10 times')
    var times = 0 
    var testSchedule = schedule.scheduleJob('*/2 * * * *', function () {
        times++
        console.log(new Date().getMinutes(), ': working...')
        
        if (times >= 10) testSchedule.cancel()
    });
})()
