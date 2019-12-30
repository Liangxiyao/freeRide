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
    indicatorColor: '#ccc',
    imgUrl: [],
    lists: [],
    hasNextPage: true,
    page: 1,
    filter: {
      start: ['','始发地',''],
      end: ['','目的地',''],
      date:formatTime(new Date(),1)
    }
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
      this.listRequest({
        index:this.data.page
      })
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
      ["filter.start"]: e.detail.value,
      page: 1,
    })
    let filterData = this.data.filter
    this.listRequest(filterData)
  },
  bindEnd: function (e) {
    this.setData({
      ["filter.end"]: e.detail.value
    })
    let filterData = this.data.filter
    this.listRequest(filterData)
  },
  bindDateChange: function (e) {
    this.setData({
      ["filter.date"]: e.detail.value
    })
  },
  listRequest(data) {
    HTTP.apiFreeRide(data).then((res) => {
      if (res.code == 0) {
        let { items, hasNextPage } = res
        let oldData = this.data.lists
        let lists = oldData.concat(items)
        this.setData({
          lists,
          hasNextPage
        })  
      } else {
        wx.showToast({
          title: res.errMsg,
          icon:'none',
          duration: 2000
        })
      }
    }).catch((err) => {
      
    });
  },
  focusFn(e) {
    console.log(e.currentTarget)
  }
})
