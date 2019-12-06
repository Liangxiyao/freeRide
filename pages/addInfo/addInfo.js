const app = getApp()
import HTTP from '../../utils/http'
import { timestamp } from '../../assets/js/util'


Page({
  data: {
    orderType: 1,
    date: '2016-09-01',
    time: '12:00',
    start: ['北京市','北京市','海淀区'],
    end: ['河南省','三门峡市','灵宝市'],
    seatIndex: 0,
    seat: ['1座','2座','3座','4座','5座','6座'],
    personIndex: 0,
    person: ['1人','2人','3人','4人','5人','6人'],
  },
  /**
   * 提交表单
  **/
  formSubmit: function (e) { 

    let rule = this.checkedForm(e.detail.value)
    if (rule) {
      let token = wx.getStorageSync('token') 
      let { orderType, date, time, start, end, seatIndex, seat } = this.data
      let seatCount = orderType === 1 ? parseInt(seat[seatIndex]) : parseInt(person[personIndex])
  
      console.log(token);
      
      let data = {
        ...e.detail.value,
        token,
        orderType,
        start:start.join('-'),
        end:end.join('-'),
        time:timestamp(date+' '+time),
        seatCount,
      }
      
      HTTP.apiAddOrder({ ...data }).then((result) => {
        console.log(result)
      }).catch((err) => {
        
      });
    }

  },
  //重置
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 表单验证
   */
  checkedForm(value) {
    if (value.mobile === '') {
      wx.showToast({
        title: '请填写联系电话',
        icon:'none',
        duration: 2000
      })
      console.log(222)
      return false
    } else {
      return true
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
  bindstart: function (e) {
    this.setData({
      start: e.detail.value
    })
  },
  bindend: function (e) {
    this.setData({
      end: e.detail.value
    })
  },
  radioChange: function (e) {    
    this.setData({
      orderType:e.detail.value
    })
  }

})