// 从数据库查询数据,返回数据
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId
const URL = 'mongodb://127.0.0.1:27017'
const DB_NAME = 'hacknews'
const COLLECTION_NAME = 'news'
module.exports = {
  getNews(callback) {
    MongoClient.connect(
      URL,
      (err, client) => {
        if (err) {
          return console.log('连接失败', err)
        }
        // 查询数据
        client
          .db(DB_NAME)
          .collection(COLLECTION_NAME)
          .find()
          .toArray((err, result) => {
            if (err) {
              console.log('查询失败', err)
            }
            // console.log(result)
            callback(result)
          })
        client.close()
      }
    )
  },
  addNews(news, callback) {
    MongoClient.connect(
      URL,
      (err, client) => {
        if (err) {
          return console.log('连接失败', err)
        }
        client
          .db(DB_NAME)
          .collection(COLLECTION_NAME)
          .insertOne(news, (err, result) => {
            if (err) {
              return console.log('添加失败', err)
            }
            if (result.result.ok === 1) {
              callback()
            }
          })
        client.close()
      }
    )
  },
  findNewsById(id, callback) {
    // 传过来的id是字符串，需要变成ObjectID类型 ,mongodb有自己的字符串类型
    id = new ObjectID(id)
    MongoClient.connect(
      URL,
      (err, client) => {
        if (err) {
          return console.log('连接失败', err)
        }
        client
          .db(DB_NAME)
          .collection(COLLECTION_NAME)
          .findOne({
            // mongodb的ID有自己的特殊格式,必须把id变成适合的格式才能查询到数据
            _id: id
          }, (err, result) => {
            if (err) {
              return console.log('查询失败了', err)
            }
            // console.log(result)
            callback(result)
          })
      }
    )
  }
}