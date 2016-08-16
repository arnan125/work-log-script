## 工作日志自动记录发送脚本

### 安装
* 在文件根目录下运行 `npm install`
* 全局安装 [forever](https://github.com/foreverjs/forever) `npm install forever -g`

### 配置
* 在文件根目录下运行 `npm run config`， 创建配置文件 `src/config.js`
* 修改配置文件，其中 `mailOptions`,`transporterOptions` 必须配置

### 运行
* 启动服务：在文件根目录下运行 `npm run start` 或者点击执行`start.bat`文件
* 查看任务：在文件根目录下运行 `npm run show`
* 终止任务：在文件根目录下运行 `npm run stop`
* 手动发送邮件：在文件根目录下运行 `npm run send`
* 手动创建日志：在文件根目录下运行 `npm run create`

### TIPS
* 将`start.bat/start.sh`文件加入开机启动任务中，可开机自动运行该脚本
* [CRON](https://zh.wikipedia.org/wiki/Cron)时间格式