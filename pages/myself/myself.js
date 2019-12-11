// pages/myself/myself.js
import HTTP from '../../utils/http'

Page({
  data: {
    userInfo:{} 
  },
  onLoad() {
    let that = this
    // wx.getSetting({
    //   success (res){
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           that.setData({
    //            userInfo:res.userInfo
    //           }) 
    //           wx.setStorage({
    //             key: 'userInfo',
    //             data: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo:userInfo
      })
    }
  },
  getUserInfoHandle(e) {
    this.setData({
      userInfo:e.detail.userInfo
    })
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo
    })
    let {nickName,avatarUrl} = e.detail.userInfo
    HTTP.apiUpdateUser({
      nickName,
      headUrl: avatarUrl,
      mobile:''
    }).then((result) => {
      wx.showToast({
        title: '信息更新成功',
        icon:'none',
        duration: 2000
      })
    }).catch((err) => {
      
    });
  }
      /**
     * 更新用户信息
     */
   
  // updateUserInfo() {
  //   let token = wx.getStorageSync('token') 
  //   wx.getUserInfo({
  //     success(res) { 
  //       console.log(res)
  //       let {nickName,avatarUrl} = res.userInfo
  //       HTTP.apiUpdateUser({
  //         token,
  //         nickName,
  //         headUrl: avatarUrl,
  //         mobile:''
  //       }).then((result) => {
  //         wx.showToast({
  //           title: '信息更新成功',
  //           icon:'none',
  //           duration: 2000
  //         })
  //       }).catch((err) => {
          
  //       });
  //     }
  //   })
  //   wx.getSetting({
  //     success(res) {
  //       // 允许授权，可以直接调用 getUserInfo 获取头像昵称
  //       if (res.authSetting['scope.userInfo']) {  
  //         wx.getUserInfo({
  //           success (res) {          
  //             let {nickName,avatarUrl} = res.userInfo
  //             HTTP.apiUpdateUser({
  //               token,
  //               nickName,
  //               headUrl: avatarUrl,
  //               mobile:''
  //             }).then((result) => {
  //               wx.showToast({
  //                 title: '信息更新成功',
  //                 icon:'none',
  //                 duration: 2000
  //               })
  //             }).catch((err) => {
                
  //             });
  //           }
  //         })
  //       } else {
  //         console.log("未授权");    
  //       }
  //     }
  //  })  
    
  //}
})