// pages/addInfo/addInfo.js
Page({
  data: {
    orderType: 0,
    date: '2016-09-01',
    time: '12:00',
    startPlace: ['北京市','北京市','海淀区'],
    endPlace: ['河南省','三门峡市','灵宝市'],
    seatIndex: 0,
    seat: ['1座','2座','3座','4座','5座','6座'],
    personIndex: 0,
    person: ['1人','2人','3人','4人','5人','6人'],
  },
  tabChange: function (e) {
    this.setData({
      orderType:e.currentTarget.dataset.type
    })
  },
  bindSeatNum: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      seatIndex: e.detail.value
    })
  },
  bindPersonNum: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
  bindStartPlace: function (e) {
    this.setData({
      startPlace: e.detail.value
    })
  },
  bindEndPlace: function (e) {
    this.setData({
      endPlace: e.detail.value
    })
  },
  radioChange: function (e) {    
    this.setData({
      orderType:e.detail.value
    })
  }

})