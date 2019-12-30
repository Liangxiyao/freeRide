
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '让我们一起回家吧',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  bindGetUserInfo: function(e) {
    if (!e.detail.userInfo) {
      return;
    } else {
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo
      })

      wx.navigateBack();
    }
  }
})