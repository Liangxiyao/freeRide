const app = getApp()
import HTTP from '../../utils/http'
import { timestamp, formatTime } from '../../assets/js/util'

const DEFAULTDATE = '请选择--'
const DEFAULTSTART = ['请选择']
const DEFAULTEND = ['请选择']

Page({
  data: {
    initDate: formatTime(new Date(),2),
    date: DEFAULTDATE,
    formInput:'',
    orderType: 1,
    start: ['请选择'],
    end: ['请选择'],
    seatIndex: 0,
    seat: ['1座','2座','3座','4座','5座','6座'],
    personIndex: 0,
    person: ['1人', '2人', '3人', '4人', '5人', '6人']
  },
  onLoad() {
    console.log(formatTime(new Date(), 2))

  },
  handleChange(e) { 
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
    let rule = that.checkedAddress() && that.checkedTime()  && that.checkedPhone(e.detail.value) 
    if (rule) {
      let { orderType, date, start, end, seatIndex, seat, person, personIndex} = that.data
      let seatCount = orderType === 1 ? parseInt(seat[seatIndex]) : parseInt(person[personIndex]) //剩余座位或同行人
      let addressType = start[1] == end[1] ? 1 : 2  //订单类型
      
      let data = {
        ...e.detail.value,
        orderType,
        addressType,
        start:start.join('-'),
        end:end.join('-'),
        time:timestamp(date),
        seatCount,
      }
      
      HTTP.apiAddOrder({ ...data }).then((result) => {
        let { code, message } = result
        
        if (code === 0) {
          // wx.showToast({
          //   title: '信息发布成功',
          //   icon:'none',
          //   duration: 2000,
          //   success() {
          //     //跳转详情
              
          //   }
            
          // })  
          wx.navigateTo({
            url: '/pages/detail/detail',
          })
          //表单重置
          that.clearInfo()

        } else {
          wx.showToast({
            title: message,
            icon:'none',
            duration: 2000
          })
        }
      }).catch((err) => {
        
      });
    }

  },
  //重置
  formReset: function (e) {
    this.clearInfo()
  },
  /**
   * 表单验证
   */
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
    let { start, end } = this.data

    if (start[0] != ['请选择'] && end[0] != ['请选择']) {
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
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindStart: function (e) {
    this.setData({
      start: e.detail.value
    })
  },
  bindEnd: function (e) {
    this.setData({
      end: e.detail.value
    })
  },
  radioChange: function (e) {    
    this.setData({
      orderType:e.detail.value
    })
  },

  /**
   * 重置信息
   */
  clearInfo() {
    this.setData({
      initDate: formatTime(new Date(),2),
      date: '请选择--',
      seatIndex: 0,
      personIndex: 0,
      formInput: '',
      start: ['请选择'],
      end: ['请选择'],
    })
  }
})