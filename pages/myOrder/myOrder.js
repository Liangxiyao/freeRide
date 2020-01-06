
import HTTP from '../../utils/http'

Page({
  data: {
    page: 1,
    lists:[]
  },
  onLoad: function () {
    this.orderList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //上拉加载
  onReachBottom(){
    let { hasNextPage, page } = this.data
    this.setData({
      page:page+1
    })
    if (hasNextPage) {
      this.orderList({
        index:this.data.page
      })
    }
  },
  orderList(params) {
    HTTP.apiOrderList(params).then((res) => {
      let { items, hasNextPage } = res
      let oldData = this.data.lists
      let lists = oldData.concat(items)
      this.setData({
        lists,
        hasNextPage
      })  
    }).catch((err) => {
      wx.showToast({
        title: err.msg,
        icon:'none',
        duration: 2000
      })
    });
  },
})