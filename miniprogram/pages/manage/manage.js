// pages/manage/manage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //数据库操作
    var that = this;
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('idList').get({
      success: res => {
        that.setData({
          idList: res.data,
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  finish: function(e) {
    console.log(e.currentTarget.dataset.index)
    var tmp_id = this.data.idList[e.currentTarget.dataset.index]._id
    console.log(tmp_id)
    const db = wx.cloud.database()
    // db.collection('idList').doc(_id).remove({
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })

    // 调用云函数
    wx.cloud.callFunction({
      name: 'delete_id',
      //传给云函数的参数
      data: {
        id:tmp_id,
      },
      // 成功回调
      complete: console.log
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})