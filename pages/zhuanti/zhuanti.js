// pages/zhuanti/zhuanti.js
import{getTopList} from "../../api/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    allData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getData(this.data.pageNum)
  },
  getData(pageNum){
    var that = this
    getTopList(pageNum).then(function (data) {
      that.setData({
        allData: data
      })
    })
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
      this.getData(1)
      this.setData({
        pageNum:1
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var page= that.data.pageNum+1
    getTopList(page).then(function (data) {
     if(data.length>0){
       var arr=that.data.allData
       arr=[...arr,...data]
       that.setData({
         allData:arr,
         pageNum:page
       })
     }else{
       wx.showToast({
         title: '已经到底了',
       })
     }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})