// miniprogram/pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: '',
    logs: '122'
  },

  bindtextinput: function (e) {
    this.setData({
      details: e.detail.value
    })
    // console.log(e.detail.value)
    console.log(this.data.details)
  },

  sub: function (e) {
    var that = this
    // console.log(e)
    var detail = this.details

    this.setData({
      logs: this.data.details
    }),

      wx.cloud.callFunction({
        name: 'updata',
        data: {
          text:that.data.details
        },
         success : res => {
        console.log('[云函数] [updataDB] 已增加Subjcts信息' + res)
      },
      fail: err => {
        console.error('[云函数] [updataDB] 增加Subject失败', err)
      }
      })
     
    
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  var that = this
  // 1. 获取数据库引用
  const db = wx.cloud.database()
  // 2. 构造查询语句
  // collection 方法获取一个集合的引用
  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
  // get 方法会触发网络请求，往数据库取数据
  db.collection('announcement').where({
    remark: 'now'
  }).get({
    success: function (res) {
      console.log(res)
      // var text = res.data[0].text
      console.log('===读取数据存入本地====')
      that.setData({
        logs: res.data[0].text
      })
      // that.data.logs= text
      console.log(this.data[0].text)
    },
    fail (res){
      console.log(' 读取失败',res)
    }
  })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})