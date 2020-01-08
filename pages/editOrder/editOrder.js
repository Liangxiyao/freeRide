import HTTP from '../../utils/http'

Page({
  data: {
    detail: {},
    seatIndex:0,
    seat: ['1座', '2座', '3座', '4座', '5座', '6座'],
    
  },
  onLoad: function () {
    let detail = wx.getStorageSync("detail")
    this.setData({
      detail: detail,
      seatIndex:detail.seatCount-1
    })
  },
   /**
   * 表单验证
   */
  checkedContact(value) {
    let contact = value.contact.replace(/(^\s*)|(\s*$)/g, "")
    if (contact === '') {
      wx.showToast({
        title: '请填写联系人',
        icon:'none',
        duration: 2000
      })
      return false
    }else {
      return true
    }
  },
  checkedPhone(value) {
    let mobile = value.mobile.replace(/(^\s*)|(\s*$)/g, "")
    if (mobile === '') {
      wx.showToast({
        title: '请填写联系电话',
        icon:'none',
        duration: 2000
      })
      return false
    } else if (!/^1[3456789]\d{9}$/.test(mobile)) {
      wx.showToast({
        title: '手机号有误',
        icon:'none',
        duration: 2000
      })
      return false
    } else {
      return true
    }
  },
  bindSeatNum: function (e) {
    this.setData({
      seatIndex: e.detail.value
    })
  },
  cancel() {
    wx.navigateBack()
  },
  formSubmit(e) {
    let that = this
    let value = e.detail.value
    let checkedResult = that.checkedContact(value) && that.checkedPhone(value) 
    let { seat, seatIndex, detail } = this.data
    let seatCount = parseInt(seat[seatIndex])

    if (checkedResult) { 
      let data = {
        id: detail.id,
        ...value,
        seatCount
      }
      
      HTTP.apiEditOrder({
        ...data
      }).then((result) => {
        wx.showToast({
          title: "修改成功",
          icon: 'success',
          duration: 2000
        })
        wx.redirectTo({
          url: `/pages/detail/detail?id=${detail.id}`,
        })
        
      }).catch((err) => {
        wx.showToast({
          title: err.msg,
          icon:'none',
          duration: 2000
        })
      });
    }
  }
})