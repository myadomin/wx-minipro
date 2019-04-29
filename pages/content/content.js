const ajax = require('../../utils/ajax.js')
const urls = require('../../config/urls.js')
const WxParse = require('../../libs/wxParse/wxParse.js');

Page({

  data: {
    contentId: '',
    startRep: '',
    endRep: '',
    endParse: '',
    title: '',
    author: '',
    html: '',
    vidArr: ''
  },

  // 处理html字符串
  parseHtml(content) {
    const html = content.replace(/section/g, 'div')
    .replace(/<(img|table) ([\s\S]*?)(\/>|>)/g, '<$1 $2 style="width: 100%!important" />')
    .replace(/<wxs ([\s\S]*?) <\/wxs>/g, '')
    return html
  },

  // 获取vid
  getQueryString (url, query) {
    const reg = new RegExp('(^|&)' + query + '=([^&]*)(&|$)', 'i');
    const r = url.substr(1).match(reg);
    return r ? unescape(r[2]) : null;
  },

  // 获取vie组成的数组
  getVidArr (video_urls) {
    if (video_urls) {
      let resArr = []
      const arr = video_urls.split(',')
      arr.forEach(url => {
        // 只显示 https://v.qq.com 的视频
        if (url.indexOf('v.qq.com') !== -1) {
          resArr.push(this.getQueryString(url, 'vid'))
        }
      })
      return resArr
    } else {
      return []
    }
  },

  // 获取文章详情
  getArticleContentById () {
    this.setData({ startRep: new Date().getTime() })
    wx.showLoading({ title: '加载中...' })
    const data = {
      id: this.data.contentId,
      openId: wx.getStorageSync('openid')
    }
    ajax.post(urls.getArticleContentById, data).then(res => {
      this.setData({ endRep: new Date().getTime() })
      const { title, author, content, video_urls } = res.data.content
      this.setData({
        title,
        author,
        html: this.parseHtml(content),
        vidArr: this.getVidArr(video_urls),
        endParse: new Date().getTime()
      })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ contentId: options.id })
    this.getArticleContentById()
  },

  /**
   * 用户点击右上角或者转发按钮 无论是否点击确定转发都会进到这里
   */
  onShareAppMessage: function (res) {
    // 转发量加一
    ajax.post(urls.incRelayNum, { id: this.data.contentId })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})