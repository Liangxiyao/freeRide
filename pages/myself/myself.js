const app = getApp()
import HTTP from '../../utils/http'


Page({
  data: {
    userInfo: {},
    isConnected:false
  },
  onLoad() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userInfo:userInfo
      })
    }

    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     that.setData({
    //       userInfo:res.data
    //     })
    //   },
    //   fail: function (err) {
    //     wx.showModal({
    //       title: err.errMsg,
    //       icon:'none',
    //       duration: 2000
    //     })
    //   }
    // })    
  },
  getUserInfoHandle(e) { 
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      return
    }
    if (e.detail.userInfo) {
      that.setData({
        userInfo:e.detail.userInfo
      })
      wx.setStorage({
        key:"userInfo",
        data: e.detail.userInfo
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权部分功能无法使用',
        showCancel: false
      })
    }   
  }
})