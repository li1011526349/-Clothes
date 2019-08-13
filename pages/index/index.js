//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    address: "无法获取位置",
    allData: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // var _this = this;
    // wx.chooseLocation({
    //   type: 'gcj02', 
    //   success(res) {
    //     var name = res.address + res.name
    //     _this.setData({
    //       name: name
    //     })
    //   }
    // })

    // var that=this
    // wx.getLocation({
    //   type: "gps",
    //   success: function(res) {
    //     console.log(res)
    //     wx.request({
    //       url: 'http://apis.juhe.cn/geo/',
    //       data:{
    //         key:"9d22e178539f5e4308ab71bed038ec16",
    //         lat:res.latitude,
    //         lng:res.longitude,
    //         type:1
    //       },
    //       success: function(data) {
    //         console.log(data)
    //         that.setData({
    //           address:data.data.result.address
    //         })
    //       }
    //     })
    //   }
    // })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  address: function () {
    var _this = this;
    wx.getSetting({
      success(res) {
         if(res.authSetting['scope.userLocation']!=true){
           wx.openSetting({
             
           })
         }
      }
    })
    wx.chooseLocation({
      type: 'gcj02', 
      success(res) {
        var address = res.address + res.name
        _this.setData({
          address: address
        })
      }
    })
  },
  onShow: function() {
    var that=this
    wx.request({
      url: 'https://www.heyuhsuo.xyz/heyushuo/index/index',
      success: function (res){
        that.setData({
          allData:res.data
        })
      }
    })
  }
})
