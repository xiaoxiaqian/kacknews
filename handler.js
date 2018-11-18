const db = require('./mongo.js')
module.exports = {
  // 渲染首页的方法
  showIndex(req, res) {
    db.getNews(data => {
      // 根据读取的数据直接渲染页面
      res.render('index.html', {
        list: data
      })
    })
  },
  // 渲染提交页的方法
  showSubmit(req, res) {
    res.render('submit.html')
  },
  addPost(req, res) {
    // 获取到post的新闻数据
    let news = req.body
    // 直接把数据添加到数据库中
    db.addNews(news, () => {
      // 成功之后，跳转到index路由
      res.redirect('/index')
    })
  },
  showDetails(req, res) {
    // 获取到id值
    let id = req.query.id
    // 根据id去数据库查找对应的数据
    db.findNewsById(id, data => {
      // 渲染详情页
      res.render('details.html', data)
    })
  }
}