// pages/apply/apply.js
import HTTP from '../../utils/http'

Page({
  data: {
    personIndex:0,
    person: [],
    formInput:'',
  },
  onLoad(options) {
    let num = []  //剩余座位
    for (let i = 1; i <= options.num; i++){
      num.push(i+'人')
    }
    this.setData({
      person:num
    })
  },
  /**
   * 提交表单
  **/
 formSubmit: function (e) { 
  let that = this
  let checkedResult = that.checkedContact(e.detail.value) && that.checkedPhone(e.detail.value) 
  if (checkedResult) {
    let { person, personIndex} = that.data
    let seatCount =  parseInt(person[personIndex]) //剩余座位或同行人
    
    let data = {
      ...e.detail.value,
      seatCount,
    }
    
    HTTP.apiAddOrder({ ...data }).then((result) => {
      let { message } = result
        wx.navigateTo({
          url: '/pages/detail/detail',
        })
      //表单重置
      that.formReset()
    }).catch((err) => {
      wx.showToast({
        title: message,
        icon:'none',
        duration: 2000
      })
    });
  }
},
  /**
   * 表单验证
   */
  checkedContact(value) {
    let contact = value.contact.replace(/(^\s*)|(\s*$)/g, "")
    if (contact === '' || contact.length < 2) {
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
    /**
   * 表单重置
   */
  formReset: function (e) {
    this.setData({
      personIndex: 0,
      formInput: ''
    })
  },
  // 预约人数
  bindPersonNum: function (e) {
    this.setData({
      personIndex: e.detail.value
    })
  },
  radioChange: function (e) {    
    this.setData({
      gender:e.detail.value
    })
  }
})