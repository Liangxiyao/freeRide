//app.js
App({
    //启动时候触发，只触发一次
  onLaunch: function () {
    this.checkNetwork()
    this.checkSession()
  },
  globalData: {
      userInfo: null,
      subDomain:'starokay'
  },
  onPageNotFound(res){
  },
  //检查网络
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
  //检测版本更新
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
  
                     
    
})