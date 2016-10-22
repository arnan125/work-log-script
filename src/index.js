var process = require('process')
var schedule = require('node-schedule')   // https://github.com/node-schedule/node-schedule

var config = require('./config.js')
var create = require("./create.js")
var send = require("./send.js")
var log = require("./log.js")

// config
config.scheduleOptions = config.scheduleOptions || {}

// tasks schedules  
//send log at about  20:30 on Friday  
var logSendSchedule = schedule.scheduleJob(config.scheduleOptions.logSend || '30 20 * * 5', function () {
    var randomRange = Math.random() * (typeof config.scheduleOptions.randomDelyRange !== 'undefined' ? config.scheduleOptions.randomDelyRange : 30 * 60) | 0  // ms
    setTimeout(send, randomRange * 1000)
})
// create log in Firday morning
var logCreateSchedule = schedule.scheduleJob(config.scheduleOptions.logCreate || '0 8 * * 1', create)

// when exiting this process, some operations to do here
process.on('exit', function () {
    logSendSchedule.cancel()
    logCreateSchedule.cancel()
})

// handle error
process.on('uncaughtException', function (e) {
    log(e, 'E')
})
