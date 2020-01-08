const app = getApp()
import HTTP from '../../utils/http'
import { timestamp, formatTime } from '../../assets/js/util'

const DEFAULTDATE = '请选择--'

Page({
  data: {
    initDate: formatTime(new Date(),2),
    date: DEFAULTDATE,
    formInput:'',
    orderType: 1,
    address: app.globalData.address,
    startIndex: '0', //默认始发站
    endIndex: '1',  //默认目的地
    seatIndex: 3,
    seat: ['1座','2座','3座','4座','5座','6座'],
    personIndex:4,
    person: ['1人', '2人', '3人', '4人', '5人', '6人'],
  },
  dateChange(e) { 
    let checkedDate = e.detail.dateString
    let checkedTimestamp = timestamp(checkedDate)
    let nowTimestamp = timestamp(this.data.initDate)
    let timeDifference = checkedTimestamp - nowTimestamp
    //出发时间最早为6小时后
    const timeDis = 6 * 60 * 60 * 1000
    if (timeDifference > timeDis) {
      this.setData({
        date: checkedDate
      })
    } else {
      wx.showToast({
        title: '出发时间最早为6小时后',
        icon:'none',
        duration: 2000
      })
      this.setData({
        date: DEFAULTDATE
      })
    }
    
  },
  /**
   * 提交表单
  **/
  formSubmit: function (e) { 
    let that = this
    let inputVal = e.detail.value
    let checkedResult = that.checkedAddress() && that.checkedTime() && that.checkedContact(inputVal) && that.checkedPhone(inputVal) 
    if (checkedResult) {
      let { orderType, date, startIndex, endIndex, seatIndex, seat, person, personIndex, address} = that.data
      let seatCount = orderType === 1 ? parseInt(seat[seatIndex]) : parseInt(person[personIndex]) //剩余座位或同行人
      let addressType = address[startIndex] == address[endIndex] ? 1 : 2  //订单类型
      let price = inputVal.price.replace(/(^\s*)|(\s*$)/g, "")
      price === '' ? -1 : parseInt(inputVal.price)

      let data = {
        ...inputVal,
        price,
        orderType,
        addressType,
        start:address[startIndex],
        end:address[endIndex],
        time:timestamp(date),
        seatCount
      }

      HTTP.apiAddOrder({
        ...data
      }).then((result) => {
          wx.redirectTo({
            url: `/pages/detail/detail?id=${result.res}`,
          })
        //表单重置
        that.formReset()
      }).catch((err) => {
        wx.showToast({
          title: err.msg,
          icon:'none',
          duration: 2000
        })
      });
    }

  },
  /**
   * 表单重置
   */
  formReset: function (e) {
    this.setData({
      initDate: formatTime(new Date(),2),
      date: '请选择--',
      seatIndex: 0,
      personIndex: 0,
      formInput: '',
      startIndex: '',
      endIndex: '',
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
  checkedAddress() {
    let { startIndex, endIndex } = this.data
    if (startIndex != '' && endIndex != '') {
      return true
    } else {
      wx.showToast({
        title: '请选择起始地址',
        icon:'none',
        duration: 2000
      })
      return false
    }
  },
  checkedTime() {
    let { date } = this.data
    if (date != DEFAULTDATE) {
      return true
    } else {
      wx.showToast({
        title: '请选择出发时间',
        icon:'none',
        duration: 2000
      })
      return false
    }
  },
  tabChange: function (e) {
    this.setData({
      orderType:e.currentTarget.dataset.type
    })
  },
  bindSeatNum: function (e) {
    this.setData({
      seatIndex: e.detail.value
    })
  },
  bindPersonNum: function (e) {
    this.setData({
      personIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // bindTimeChange: function (e) {
  //   this.setData({
  //     time: e.detail.value
  //   })
  // },
  bindStart: function (e) {
    this.setData({
      startIndex: e.detail.value
    })
  },
  bindEnd: function (e) {
    this.setData({
      endIndex: e.detail.value
    })
  },
  radioChange: function (e) {    
    this.setData({
      gender:e.detail.value
    })
  }
})