/*
** @desc 获取该日所在周任意一天
** @param nth [0-6] 周日到周六
** @param day 这周内的某一天日期 Date|date string
*/
var getThisDayWeekNthDay = function (date, nth) {
    if(typeof date === 'string') date = new Date(date)

    var thisNth = date.getDay()
    var thatDate = new Date(date.getTime() + (nth-thisNth) * 3600 * 24 * 1000)
    return thatDate
}

/*
** @desc 获取该周任意一天
** @param nth [0-6] 周日到周六
*/
var getThisWeekNthDay = function (nth) {
    var date = new Date()
    return getThisDayWeekNthDay(date, nth)
}

/*
** 获取该周第一天 周日
*/
var getThisWeekFirstDay = function () {
    return getThisWeekNthDay(0)
}

/*
** 获取该周最后一天 周六
*/
var getThisWeekLastDay = function () {
    return getThisWeekNthDay(6)
}

var format = function (date, fmt) {
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/*
** @desc 生成文件名称 形如 log_yyyy_mm_dd_mm_dd.md 
** @param 周内某一天
*/
var generateFile = function (date) {
    if(typeof date === 'string')date = new Date(date)
    if(typeof date === 'undefined') date = new Date()
    
    if(! (date instanceof Date)) {
        throw new Error('请传入一个date字符串或者Date实例或不传参')
        return ''
    }  
    
    var weekFirstDay = getThisDayWeekNthDay(date, 0)
    var weekLastDay = getThisDayWeekNthDay(date, 6)
    var year = date.getFullYear()
    var startDate = `${weekFirstDay.getMonth() + 1}_${weekFirstDay.getDate()}`
    var endDate = `${weekLastDay.getMonth() + 1}_${weekLastDay.getDate()}`
    
    var filename = `log_${year}_${startDate}_${endDate}.md`
    var content = `## 周报(${ startDate.replace('_','.') } - ${ endDate.replace('_','.') })\r\n`

    return {
        filename: filename,
        content: content,
    }
}

module.exports = {
    getThisDayWeekNthDay: getThisDayWeekNthDay,
    getThisWeekNthDay: getThisWeekNthDay,
    getThisWeekFirstDay: getThisWeekFirstDay,
    getThisWeekLastDay: getThisWeekLastDay,
    format: format,
    generateFile: generateFile,
}