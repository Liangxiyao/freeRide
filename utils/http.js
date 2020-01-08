//import { userLogin } from './login'

const API_URI = 'https://gaidiha.com/api'
//const API_URI = 'http://localhost:8080'
const request = (url, params, method)=>{
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token') 
    console.log(token)
    wx.request({
      url: `${API_URI}${url}`,
      data: params,
      header: {
        'token': token ? token : '',
       // "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM4ODUyNjAsInVzZXJJZCI6IjEiLCJpYXQiOjE1NzM4ODQ5NjB9.RhLaM5nmXBF9J8AF7sLMj7ZUT0F-kO3_AS9tKv3nxyk",
        "Content-Type": method?"application/x-www-form-urlencoded":"application/json"
      },
      method: method || 'GET',
      success(res) {
        wx.hideLoading()
        const isSuccess = isHttpSuccess(res.statusCode);
        // 成功的请求状态
        if (isSuccess) { 
          let { code, message } = res.data
          if (code === 0) { 
            resolve(res.data);
          } else if (code === 600010) {//token过期
            wx.login({
              success (res) {
                if (res.code) {  
                  http.apiLogin({
                    code:res.code
                  }).then((res) => { 
                    if (res.code === 0) {
                      console.log(wx.getStorageSync('token') )
                      wx.setStorageSync('token', res.res)
                      console.log(wx.getStorageSync('token') )
                    }
                  }).catch((err) => {
                    wx.showToast({
                      title: err,
                      icon:'none',
                      duration: 2000
                    })
                  });
                }
              }
            })
          } else {
            wx.showToast({
              title: message,
              icon:'none',
              duration: 2000
            })
          }      
        } else {
          reject({
            msg: `网络错误:${res.statusCode}`
          });
        }
      } ,
      fail() {
        wx.showToast({
          title: '出错了~~',
          icon:'none',
          duration: 2000
        })
      }
    })
  })
}
function isHttpSuccess(status) {
  return status >= 200 && status < 300 || status === 304;
}

const http = {
  request,
  apiLogin: p => request('/user/login', p),
  apiBanner: p => request('/common/index', p, 'POST'),
  apiFreeRide: p => request('/freeRide/list', p, 'POST'),
  apiFreeRideDeatil: p => request('/freeRide/detail', p),
  apiAddOrder: p => request('/freeRide/pub', p, 'POST'),
  apiUpdateUser: p => request('/user/update', p),
  apiOrderList: p => request('/freeRide/user/list', p, 'POST'),
  apiCloseOrder: p => request('/freeRide/order/close', p, 'POST'),
  apiEditOrder: p => request('/freeRide/order/edit', p, 'POST')
  
}


export default http