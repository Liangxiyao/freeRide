//index.js
//获取应用实例
const app = getApp()
import HTTP from '../../utils/http'
import { formatTime } from '../../assets/js/util'

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 3000,
    indicatorColor: '#ddd',
    lists: [],
    hasNextPage: true,
    page: 1,
    address: app.globalData.address,
    startIndex: '', //默认始发站
    endIndex: '',  //默认目的地
    date:formatTime(new Date(),1)
  },
  /**
   * 右上角点击转发
   */
  onShareAppMessage: function (res) {
    return {
      title: "与您同行",
      path: "/pages/index/index",
      imageUrl:""
    }
  },
  onLoad() {
    this.listRequest()  
    this.bannerFn()
  },
  //下拉刷新
  onPullDownRefresh(){
  },
  //上拉加载
  onReachBottom(){
    let { hasNextPage, page } = this.data
    this.setData({
      page:page+1
    })
    if (hasNextPage) {
      this.listRequest({
        index:this.data.page
      })
    }
  },
  //发布信息入口、获取用户信息授权 
  getUserInfoHandle(e) {
    if (e.detail.userInfo) {
      wx.setStorage({
        key:"userInfo",
        data: e.detail.userInfo
      });
      wx.navigateTo({
        url: '/pages/addInfo/addInfo',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权部分功能无法使用',
        showCancel: false
      })
    }

  },
  bindStart: function (e) {
    this.setData({
      startIndex: e.detail.value,
      page: 1,
    })
    let { startIndex, endIndex, date, address} = this.data
    this.listRequest({
      start: address[startIndex],
      end: address[endIndex],
      date
    })
  },
  bindEnd: function (e) {
    this.setData({
      endIndex: e.detail.value
    })
    let { startIndex, endIndex, date, address} = this.data
    this.listRequest({
      start: address[startIndex],
      end: address[endIndex],
      date
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    let { startIndex, endIndex, date, address} = this.data
    this.listRequest({
      start: address[startIndex],
      end: address[endIndex],
      date
    })
  },
  listRequest(data) {
    HTTP.apiFreeRide(data).then((res) => {
      let { items, hasNextPage } = res
      let oldData = this.data.lists
      let lists = oldData.concat(items)
      this.setData({
        lists,
        hasNextPage
      })  
    }).catch((err) => {
      wx.showToast({
        title: err.msg,
        icon:'none',
        duration: 2000
      })
    });
  },
  bannerFn() {
    HTTP.apiBanner().then((result) => {
      if (result.code === 0) {
        this.setData({
          banner:result.res.ad
        })
      }else {
        wx.showToast({
          title: result.errMsg,
          icon:'none',
          duration: 2000
        })
      }
    })
  }
})
