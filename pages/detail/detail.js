// pages/detail/detail.js
import HTTP from '../../utils/http'

Page({
  data:{
    detail: {},
    personIndex:4,
    person: ['1人', '2人', '3人', '4人', '5人', '6人'],
    btnShow: false,
  },
  onLoad(options) {
    this.setData({
      orderId:options.id
    })
    this._getDetail(options.id)

    //从我的订单进去 可以编辑订单
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    if (prevpage.route == "pages/myOrder/myOrder") {
      this.setData({
        btnShow:true
      })
    }
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
        phoneNumber: mobile,
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
    let that = this
    wx.showModal({
     // title: '确定关闭订单吗',
      content: '确定关闭当前订单吗',
      success (res) {
        if (res.confirm) {
          HTTP.apiCloseOrder({
            id: that.data.orderId
          }).then((result) => {

            wx.navigateTo({
              url: '../../pages/myOrder/myOrder'
            })
            
          }).catch((err) => {
            wx.showToast({
              title: err.msg,
              icon:'none',
              duration: 2000
            })
          });
        } else if (res.cancel) {
          wx.hideToast()
        }
      }
    })
  },
  edit() {
    wx.setStorage({
      key:"detail",
      data: this.data.detail
    })
    
    wx.redirectTo({
      url:"../../pages/editOrder/editOrder"
    })
  }
})