// pages/cart/cart.js
import {getCart,getDel} from '../../api/index.js'
var pri = 0
var changenum=0
var number=0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList:null,
    number:0,
    price:0,
    changeall:false,
    startX:null,
    endX:null,
    animate:null,
    dl:true
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
    getCart().then(function(res){
      res.forEach((item)=> {
          item.select = false
          item.animate=''
          item.dl= true
      })
      that.setData({
        cartList:res
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
  change(event){
    var index = event.target.dataset.index;
    var that = this
    var list=this.data.cartList
    for (var i=0;i<list.length;i++){
      if (index == i){
        list[i].select = !list[i].select 
        if(list[i].select==true){
          pri += (list[i].retail_price * list[i].number)
          number++
        }else{
          pri -= (list[i].retail_price * list[i].number)
          number--
        }
     }
    }
    if (number == list.length) {
      that.data.changeall = true
      console.log(that.data.changeall)
      changenum++
    }else{
      that.data.changeall = false
    }
    that.setData({
      cartList: list,
      price:pri,
      changeall:that.data.changeall,
      number:number
    })
  },
  changeall(event){
    changenum++
    pri = 0
    var index = event;
    var that = this
    var list = this.data.cartList
    number=list.length
    for (var i = 0; i < list.length; i++) {
      if(changenum%2!=0){
        list[i].select = true
        that.data.changeall=true
        pri += (list[i].retail_price * list[i].number)
      }else{
        list[i].select = false
        that.data.changeall=false
        pri = 0
        number=0
      } 
    }
    that.setData({
      cartList: list,
      price: pri,
      changeall:that.data.changeall,
      number:number
    })
  },
  touchstart(e){
    var that = this
    for(var i=0;i<e.changedTouches.length;i++){
      that.data.startX = e.changedTouches[i].clientX
    }
    var list = that.data.cartList
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == e.currentTarget.dataset.id) {
        this.animation()
      }else{
        this.animation_r()
      }
    }
    that.setData({
      startX: that.data.startX
    })
  },
  touchend(e) {
    var that = this
    for (var i = 0; i < e.changedTouches.length; i++) {
      that.data.endX = e.changedTouches[i].clientX
    }
    var list = that.data.cartList
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == e.currentTarget.dataset.id) {
        if(that.data.startX-that.data.endX>=10){
          list[i].animate=this.animation()
        }else{
          list[i].animate =this.animation_r()
        }
       }
    }
    that.setData({
      endX: that.data.endX,
      cartList:list
    })
  },
  animation(){
    var that = this
      var animation = wx.createAnimation({
      })
      animation.left('-130rpx').step()
    return animation.export()
  },
  animation_r(){
    var that = this
      var animation = wx.createAnimation({
      })
      animation.left('0').step()
    return animation.export()
  },
  del(a){
    var that = this
      var list = that.data.cartList
      wx.showModal({
        title: '提示',
        content: '确认删除吗？',
        success:function(res){
        if(res.confirm==true){
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == a.target.dataset.dl) {
              getDel(list[i].id).then()
              var arr = list.filter(item => {
                return item.id != a.target.dataset.dl
              })
              that.setData({
                cartList: arr
              })
            }
          }
        }
      }
    })
  }
})