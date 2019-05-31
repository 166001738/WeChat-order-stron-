// pages/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sum: 0,
    openid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //数据库操作
    var that = this;
    var sum = this.data.totalMoney;
    var tempid = app.globalData.openid;
    console.log(tempid);
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('cartList').where({
      orderId:tempid
    }).get({
      success: res => {
        that.setData({
          cartList: res.data,
          sum : wx.getStorageSync("totalMoney")
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