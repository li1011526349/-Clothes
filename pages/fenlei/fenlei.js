// pages/fenlei/fenlei.js
import { getLeft , getList} from '../../api/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    left:null,
    right:null,
    id: 1005000,
    active:0
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
    var that = this
    getLeft().then(function(data){
      that.setData({
        left:data
      })
    })
    getList(that.data.id).then(function (data) {
      that.setData({
        right: data
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

  },
  getlist (e) {
    var that = this
    getList(e.currentTarget.dataset.index).then(function (data) {
      that.setData({
        right:data,
        id: e.currentTarget.dataset.index
      })
    })
  }
})