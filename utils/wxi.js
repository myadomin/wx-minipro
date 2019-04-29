const ajax = require('./ajax.js')
const urls = require('../config/urls.js')

// 检查 storageOpenid 是否过期
const checkSession = () => {
  return new Promise((resolve, reject) => {
    const storageOpenid = wx.getStorageSync('openid');
    if (storageOpenid) {
      // checkSession暂时没有意义，因为存储的是openid(永远不变化)，只要实现无storageOpenid就登录即可
      // 后期如果要storage sessionKey这种session过期再获取就变化的东西才有意义
      wx.checkSession({
        success: function () {
          console.log('session_key未过期，storage里有openid')
          resolve()
        },
        fail: function () {
          console.log('session_key过期，重新登录')
          doLogin(resolve, reject);
        }
      });
    } else {
      console.log('无storageOpenid，登录')
      doLogin(resolve, reject);
    }
  })
}

const doLogin = (resolve, reject) => {
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      ajax.post(urls.getOpenIdByCode, { code: res.code }).then(res => {
        if (res.ret === 0) {
          console.log('请求得到openid', res.data.openid)
          wx.setStorageSync('openid', res.data.openid)
        } else {
          wx.showToast({
            icon: 'none',
            title: '登录错误'
          })
        }
        // 就算登录错误也进入列表页，登录错误只是无法redis记录已读文章
        resolve()
      })
    }
  })
}

module.exports = {
  checkSession: checkSession
}