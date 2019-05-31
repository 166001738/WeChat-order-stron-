// miniprogram/pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: '',
    logs: '1'
  },

  bindtextinput: function (e) {
    this.setData({
      details: e.detail.value
    })
    // console.log(e.detail.value)
    console.log(this.data.details)
  },

  sub: function (e) {
    var that=this
    // console.log(e)
    var detail = this.details
    this.setData({
      logs: this.data.details
    })
    var db = wx.cloud.database();
    // var that = this;
    // var the_text = this.data;
    // this.setData({
    //   "query": "db.collection(\"anonuncement\").where({remark:now}).update({data:{text:{{details}}})"
    // })
    db.collection('anonuncement').doc('ee537e0b-2665-4540-93ff-e37ca43c275f').update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 text 字段置为details
        text: that.details
      },
      success: function (res) {
        console.log(res.data)
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    // 2. 构造查询语句
    // collection 方法获取一个集合的引用
    // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
    // get 方法会触发网络请求，往数据库取数据
    db.collection('anonuncement').where({
      remark: "now"
    }).get({
      success: function (res) {
        // 输出 [{ "title": "The Catcher in the Rye", ... }]
        // console.log(res)
        // console.log(res.data)
        console.log(res.data[0].text)
        // var text = res.data[0].text
        console.log('===读取数据存入本地====')
        that.setData({
          logs: res.data[0].text
        })
        // that.data.logs= text
        console.log(this.data[0].text)
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