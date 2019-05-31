// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event
  try {
    return await db.collection('idList').where({
      _id : id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}