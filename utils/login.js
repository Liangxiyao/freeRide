import HTTP from './http'
//用户登陆
export function userLogin() {
  wx.checkSession({
    success: function () {
      //存在登陆态
    },
    fail: function () {
      //不存在登陆态
      toLogin()
    }
  })
}
 
export function toLogin() {
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        HTTP.apiLogin({
          code:res.code
          //code:"5db78ffb5277b054fd31"
        }).then((res) => { 
          if (res.code === 0) {
            wx.setStorage({
              key:"token",
              data: res.res
            })
          }
          console.log(wx.getStorageSync('token'))
        }).catch((err) => {
          console.log(err)
        });
      }
    },
    fail: function (res) {
      console.log(res)
    }
  })
 
}
 
export function getUserInfo() {
  wx.getUserInfo({
    success: function (res) {
      var userInfo = res.userInfo
      userInfoSetInSQL(userInfo)
    },
    fail: function () {
      userAccess()
    }
  })
}
 
function userInfoSetInSQL(userInfo) {
  wx.getStorage({
    key: 'third_Session',
    success: function (res) {
      wx.request({
        url: 'Our Server ApiUrl',
        data: {
          third_Session: res.data,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          gender: userInfo.gender,
          province: userInfo.province,
          city: userInfo.city,
          country: userInfo.country
        },
        success: function (res) {
          if (res.code === 0) {
            //SQL更新用户数据成功
          }
          else {
            //SQL更新用户数据失败
          }
        }
      })
    }
  })
}