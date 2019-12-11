//index.js
//获取应用实例
const app = getApp()
import HTTP from '../../utils/http'

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    indicatorColor: '#ccc',
    imgUrl: [],
    lists: [],
    hasNextPage: true,
    page:1
  },
  onLoad(options) {
    this._getFreeRide()  
  },
  //上拉刷新
  onPullDownRefresh(){
  },
  //上拉加载
  onReachBottom(){
    let { hasNextPage, page } = this.data
    this.setData({
      page:page+1
    })
    if (hasNextPage) {
      this._getFreeRide()
    }
  },
  //获取用户信息授权 、发布信息入口
  getUserInfoHandle(e) {
    if (e.detail.userInfo) {
      wx.setStorage({
        key:"userInfo",
        data: e.detail.userInfo
      });
      wx.navigateTo({
        url: '/pages/addInfo/addInfo',
      })
    }

    // wx.getSetting({
    //   success(res) {
    //     // 允许授权，可以直接调用 getUserInfo 获取头像昵称
    //     if (res.authSetting['scope.userInfo']) {  
    //       wx.getUserInfo({
    //         success (res) {          
    //           wx.setStorage({
    //             key:"userInfo",
    //             data: res.userInfo
    //           });
    //           wx.navigateTo({
    //             url: '/pages/addInfo/addInfo',
    //           })
    //         }
    //       })
    //     } else {
    //       console.log("未授权");    
    //     }
    //   }
    // })  
  },
  //列表信息
  _getFreeRide() {
    let that = this
    HTTP.apiFreeRide({
      index:that.data.page
    }).then((res) => {
      if (res.code == 0) {
        let { items, hasNextPage } = res
        let oldData = that.data.lists
        let lists = oldData.concat(items)
        this.setData({
          lists,
          hasNextPage
        })  
      } else {
        console.log(res.errMsg)
      }
    }).catch((err) => {
      
    });
  }
})
