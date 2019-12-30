//import { userLogin } from './login'

const API_URI = 'https://gaidiha.com/api'

const request = (url, params, method)=>{
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token') 
    wx.request({
      url: `${API_URI}/${url}`,
      data: params,
      header:{'token':token?token:''},
      methods: method || 'GET',
      success(res) {
        wx.hideLoading()
        const isSuccess = isHttpSuccess(res.statusCode);
        // 成功的请求状态
        if (isSuccess) { 
          let { code, message } = res.data
          //登陆成功
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
                      wx.setStorage({
                        key:"token",
                        data: res.res
                      })
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

const http = {
  request,
  apiLogin: p => request('/user/login', p),
  apiFreeRide: p => request('/freeRide/list', p),
  apiFreeRideDeatil: p => request('/freeRide/detail', p),
  apiAddOrder: p => request('/freeRide/pub', p, 'POST'),
  apiUpdateUser: p => request('/user/update', p)

}


export default http