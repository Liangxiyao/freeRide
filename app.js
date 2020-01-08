//app.js
import HTTP from './utils/http'
App({
  globalData: {
    userInfo: null,
    isConnected: false,
    address: ["北京","三门峡","灵宝","渑池","卢氏","义马","洛阳"]
  },
    //启动时候触发，只触发一次
  onLaunch: function () {
    this.checkNetwork()
    this.checkSession()
    this.getLogin()
  },
  onPageNotFound(res){
  },
  /**
   * 检查网络
   */
  checkNetwork() {
   // const isConnected = true
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === "none") {
          wx.showToast({
            title: '请检查网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })   
    wx.onNetworkStatusChange((res) => {      
      if (!res.isConnected) {
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000
        })
      } else {
        wx.hideToast()
      }
    });
  },
  /**
   * 检测版本更新
  */
  checkSession() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
    // 新版本下载失败
    updateManager.onUpdateFailed(() => {
      wx.showModal({
        title: '升级失败~',
        content: '新版本下载失败，请检查网络~',
      })
    })
  },
   /**
    * 获取code
    */
  getLogin() {
    wx.login({
      success (res) {
        if (res.code) {  
          HTTP.apiLogin({
            code:res.code
          }).then((res) => { 
            if (res.code === 0) {
              wx.setStorageSync('token', res.res)
            }
          }).catch((err) => {
            // wx.showToast({
            //   title: err,
            //   icon:'none',
            //   duration: 2000
            // });
          });
        }
      }
    })
  },
  /**
   *获取用户设置
   */
  getSetting() {
    wx.getSetting({
      success(res) {  
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
               userInfo:res.userInfo
              }) 
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/authorize/authorize'
          })
        } 
      },
      fail(err){
        console.log('fail'+err)
      }
    })
  }
    
})