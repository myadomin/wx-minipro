const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        if (res.statusCode === 200) {
          if (res.data.ret === 1) {
            resolve(res.data)
          } else {
            resolve(res.data)
            // 数据库处理失败等情况 返回ret 0
            // const err = `处理失败：ret ${res.data.ret}`
            // wx.showToast({
            //   title: err,
            //   icon: 'none'
            // })
            // reject(err)
          }
        } else {
          // 400 500等非200的情况
          const err = `接口错误：statusCode ${res.statusCode}`
          wx.showToast({
            title: err,
            icon: 'none'
          })
          reject(err)
        }
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

module.exports = {
  get: (url, data = {}) => request(url, 'GET', data),
  post: (url, data = {}) => request(url, 'POST', data)
}