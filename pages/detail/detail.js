// pages/detail/detail.js
import HTTP from '../../utils/http'

Page({
  data:{
    
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
        console.log(this.data.detail)
      }
    }).catch((err) => {
      
    });
  }
})