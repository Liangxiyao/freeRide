// pages/detail/detail.js
import HTTP from '../../utils/http'

Page({
  data:{
    detail: {},
    personIndex:4,
    person: ['1人', '2人', '3人', '4人', '5人', '6人'],
  },
  onLoad(options) {
    let orderId = options.id
    this._getDetail(orderId)
  },
  _getDetail(orderId) {
    HTTP.apiFreeRideDeatil({
      id:orderId
    }).then((result) => {
      if (result.code == 0) {
        let { res } = result
        this.setData({
          detail: res
        })
      }
    }).catch((err) => {
      
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
  }
})