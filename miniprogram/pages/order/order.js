const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    totalMoney: 0,
    currentIndex: 0,
    itemList: [],
    itemnum:[{"number":0}],
    orderId: 0,
    item_number:[0,0,0],
    logs:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    //数据库操作
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('dishes').get({
      success: res => {
        that.setData({
          listData: res.data,
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
       
    // 1. 获取数据库引用
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

    //获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    
  },

  //增加菜品
  addItem: function(e) {
    var that = this;
    var totalMoney = this.data.totalMoney;
    //var index = e.currentTarget.dataset.index;
    var p = this.data.totalMoney + this.data.listData[e.currentTarget.dataset.index].price;
    var item_number = this.data.item_number;
    item_number[e.currentTarget.dataset.index] = item_number[e.currentTarget.dataset.index]+1; 
    // var pitem = {
    //   "name": this.data.listData[e.currentTarget.dataset.index].name,
    //   "number": 1,
    //   "price": this.data.listData[e.currentTarget.dataset.index].price,
    // }
    // var itemList = this.data.itemList;
    // itemList.push(pitem);
    that.setData({
      totalMoney: p,
      item_number:item_number,
    })
    console.log(item_number);
    //console.log(itemList);
  },

  //删除菜品
  subItem: function (e) {
    var that = this;
    var totalMoney = this.data.totalMoney;
    //var index = e.currentTarget.dataset.index;
    var p = this.data.totalMoney - this.data.listData[e.currentTarget.dataset.index].price;
    var item_number = this.data.item_number;
    if (item_number[e.currentTarget.dataset.index]>0)
    {
      item_number[e.currentTarget.dataset.index] = item_number      [e.currentTarget.dataset.index] - 1;
    }
    that.setData({
      totalMoney: p,
      item_number: item_number,
    })
    console.log(item_number);
    //console.log(itemList);
  },

  //生成订单
  toBuy: function() {
    wx.setStorageSync("totalMoney", this.data.totalMoney);
    const db = wx.cloud.database();
    var item_number = this.data.item_number;
    var openid = this.data.openid;
    openid = app.globalData.openid;
    for(var i=0;i<3;i++)
    {
      if(item_number[i]>0)
      {
        var price = this.data.listData[i].price * this.data.item_number[i];
        var pitem = {
          "name": this.data.listData[i].name,
          "number": this.data.item_number[i],
          "price": price,
          "orderId":openid
        }
        var itemList = this.data.itemList;
        itemList.push(pitem);
      }
    }
    console.log(this.data.totalMoney);
    console.log(itemList);
    var len = this.data.itemList.length;
    //var cur_id = this.data.orderId+1;
    for(var index=0;index<len;index++)
    {
      //console.log(index);
      //console.log(this.data.itemList.length);
      db.collection('cartList').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          name: this.data.itemList[index].name,
          number: this.data.itemList[index].number,
          price: this.data.itemList[index].price,
          orderId: openid,
        },
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
          wx.navigateTo({
            url: '../list/list',
          })
        },
        fail: console.error
      })
    }
    //存入id
    db.collection('idList').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        orderId: openid,
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error
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

  },

})