const express = require('express')
// 导入页面渲染模块
const handler = require('./handler')
// 启用express的router中间件
const router = express.Router()
// 注册路由
router.get('/', (req, res) => {
  // 重定向到主页
  res.redirect('/index')
})
router.get('/index', (req, res) => {
  // 渲染首页
  handler.showIndex(req, res)
})
router.get('/submit', (req, res) => {
  // 渲染添加页
  handler.showSubmit(req, res)
})
router.post('/add', (req, res) => {
  // 处理 post 添加
  handler.addPost(req, res)
})
router.get('/details', (req, res) => {
  // 渲染详情页
  handler.showDetails(req, res)
})
// 暴露路由
module.exports = router