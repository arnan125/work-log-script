module.exports = {
    // required
    mailOptions: {
        from: '"魏明圆" <mingyuan.wei@ymm56.com>',
        to: 'mingyuan.wei@ymm56.com',
        subject: '',   // default 周报 mm月dd日 -- mm月dd日 
    },
    // required
    transporterOptions:{
        host: 'smtp.mxhichina.com',
        port: 25,
        secure: false,  // ssl seems not support by server smtp.mxhichina.com
        auth: {
            user: 'mingyuan.wei@ymm56.com',
            pass: '*********',
        }
    },
    contentOptions: {
        mailHeader: '## hi someone',
        mailFooter: 'arnan',
        parseMD: true,  // parsing markdown file to html or not
        verifyReg: ''   // verify mail content using a reg expression, default `/^([\s\S]*?)周一([\s\S]*?)周二([\s\S]*?)周三([\s\S]*?)周四([\s\S]*?)周五([\s\S]*?)$/` 
    },
    scheduleOptions: {
        logCreate: '',  // 'cron' string, default '0 8 ? * 1' in Firday morning
        logSend: '',    // 'cron' string, default '30 20 ? * 5' 20:30 on Friday
        // randomDelyRange: 30 * 60, // s,  default half an hour 
    }
}