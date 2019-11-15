const API_URI = 'https://gaidiha.com/api'

const request = (url, params, method)=>{
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
      wx.request({
        url: `${API_URI}/${url}`,
        data: params,
        methods: method || 'GET',
        success(res) {
          wx.hideLoading()
          // console.log(res)
          const isSuccess = isHttpSuccess(res.statusCode);
          // 成功的请求状态
          if (isSuccess) {  
            resolve(res.data);
          } else {
            reject({
              msg: `网络错误:${res.statusCode}`,
              detail: res.msg
            });
          }
        } ,
        fail: reject
      })
  })
}
function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}


export default {
  request,
  apiLogin: p => request('/user/login', p),
  apiFreeRide: p => request('/freeRide/list', p),

}