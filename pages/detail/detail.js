// pages/detail/detail.js
import HTTP from '../../utils/http'

Page({
  data:{
    detail: {},
    personIndex:4,
    person: ['1人', '2人', '3人', '4人', '5人', '6人'],
    btnShow: false
  },
  onLoad(options) {
    let orderId = options.id
    this._getDetail(orderId)

    //上一页路径
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    if (prevpage == "pages/myOrder/myOrder") {
      this.setData({
        btnShow:true
      })
    }
    console.log(prevpage.route)

  },
  _getDetail(orderId) {
    HTTP.apiFreeRideDeatil({
      id:orderId
    }).then((result) => {
      let { res } = result
      this.setData({
        detail: res
      })
    }).catch((err) => {
      wx.showToast({
        title: err.msg,
        icon:'none',
        duration: 2000
      })
    });
  },
  tel () {
    if (this.data.detail) {
      let { mobile } = this.data.detail
      wx.makePhoneCall({
        phoneNumber: mobile, //这个是我的手机号，模拟测试
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    }
  },
  close() {
    wx.showModal({
     // title: '确定关闭订单吗',
      content: '确定关闭当前订单吗',
      success (res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          wx.hideToast()
        }
      }
    })
  }
})