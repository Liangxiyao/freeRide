//app.js
import HTTP from './utils/http'
App({
  navigateToLogin:false,
    //启动时候触发，只触发一次
  onLaunch: function () {
    this.checkNetwork()
    this.checkSession()
    this.getLogin()
  },
  globalData: {
    userInfo: null,
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
          duration: 2000,
          // complete: function() {
          //   that.goStartIndexPage()
          // }
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
            
          })
        } else {
          console.log(res.errMsg)
        }
      }
    })
  },
   /**
    * 跳转认证页面
    */
  goLoginPageTimeOut: function() {
    if (this.navigateToLogin){
      return
    }
    wx.removeStorageSync('token')
    this.navigateToLogin = true
    setTimeout(()=>{
      wx.navigateTo({
        url: "/pages/authorize/authorize"
      })
    }, 1000)
  },
  /**
   *  检测登录状态
   */
  checkLoginStatus(){ 
    const _this = this
    const token = wx.getStorageSync('token');
    if (!token) {
      _this.goLoginPageTimeOut()
      return
    }
    // WXAPI.checkToken(token).then((res) => {
    //   if (res.code != 0) {
    //     wx.removeStorageSync('token')
    //     _this.goLoginPageTimeOut()
    //     return
    //   }
    // })
    wx.checkSession({
      fail() {
        _this.goLoginPageTimeOut()
        return
      }
    })
  },                
    
})