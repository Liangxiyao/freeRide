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
  },
  getUserInfoHandle(e) { 
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      if (e.currentTarget.dataset.obj === 'order') {
        wx.navigateTo({
          url:'../../pages/myOrder/myOrder'
        })
      }
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
      if (e.currentTarget.dataset.obj === 'order') {
        wx.navigateTo({
          url:'../../pages/myOrder/myOrder'
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权部分功能无法使用',
        showCancel: false
      })
    }   
  },
  contactMe() {
    wx.showModal({
      title: '提示',
      content: '上班时间：9:00 至 18:00，是否复制微信号？',
      confirmText: '复制',
      success() {
        wx.setClipboardData({
          data: 'ailefei',
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            });
          }
        })
      }
    })
  }
})