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
    freeRideLists:[]
  },
  onLoad(options) {
    this._getLogin()
    this._getFreeRide()  
  },
  //上拉刷新
  onPullDownRefresh(){
  },
  //上拉加载
  onReachBottom(){
    console.log('上拉加载')
  },
  //获取code
  _getLogin() {
    wx.login({
      success: function (res) {
        if (res.code) {  
          HTTP.apiLogin({
            //code:res.code
            code:"5db78ffb5277b054fd31"
          }).then((res) => { 
            if (res.code === 0) {
              wx.getStorage({
                key:"session",
                value: res.res
              })
            }
          }).catch((err) => {
            
          });
        } else {
          console.log(res.errMsg)
        }
      }
    })
  },
  //发布信息入口
  addInfoHandle(e) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              wx.navigateTo({
                url: '/pages/addInfo/addInfo',
              })

            }
          })
        }
      }
    })
    
  },
  //列表信息
  _getFreeRide() {
    HTTP.apiFreeRide().then((res) => {
      console.log(res)
      if (res.code == 0) {
        let { items } = res
        this.setData({
          freeRideLists:items
        })  
      } else {
        console.log(res.errMsg)
      }
    }).catch((err) => {
      
    });
  }
})
