// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// cloud.init({
//   env: 'zytry-41b1f6'
// })

const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  try{
    console.log(event);
  await db.collection('announcement').doc('f95e0dca-7f23-476d-b06a-c976480e9f5e').update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 text 字段置为details
      text: event.text
    },
    success: function (res) {
      console.log('updata_success')
      console.log(res)
    }
  })
  }
  catch (e) {
    console.error(e)
  }
}