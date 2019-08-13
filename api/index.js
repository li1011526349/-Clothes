var url ="https://www.heyuhsuo.xyz/heyushuo/"
export function getTopList(pageNum){
  return new Promise(function(resolve,reject){
    wx.request({
      url: url + 'topic/listaction',
      data: {
        page: pageNum
      },
      success: function (res) {
        resolve(res.data.data)
      },
      fail:function (error){
        reject(error)
      }
    })
  })
}

export function getLeft() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url + 'category/indexaction',
      success: function (res) {
        resolve(res.data.categoryList)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

export function getList(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url + 'category/currentaction',
      data:{
        id: id
      },
      success: function (res) {
        resolve(res.data.data.currentOne)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}


export function getCart() {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url + 'cart/cartList',
      data:{
        openId: 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c'
      },
      success: function (res) {
        resolve(res.data.data)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

export function getDel(id) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url + 'cart/deleteAction',
      data: {
        id: id
      },
      success: function (res) {
        resolve(res.data.data)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
