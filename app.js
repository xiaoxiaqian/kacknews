// 首先安装 express,art-template,express-art-template,body-parser,mongodb
// 导入express,启动服务
const express = require('express')
const path = require('path')
const app = express()
// 导入路由模块
const router = require('./router')
// 指定模板引擎
app.engine('html', require('express-art-template'))
// 指定静态资源目录
app.use('/assets', express.static(path.join(__dirname, 'assets')))
// 使用body-parser中间件处理post数据
app.use(require('body-parser').urlencoded({
  extended: true
}))
// 启用路由
app.use(router)
app.listen(8888, () => {
  console.log('已启动,监听端口8888')
})