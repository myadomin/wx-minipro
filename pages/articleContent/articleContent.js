// pages/articleContent/articleContent.js
const ajax = require('../../utils/ajax.js')
const urls = require('../../config/urls.js')
const WxParse = require('../../libs/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startRep: '',
    endRep: '',
    endParse: '',
    nodes: '',
    vid: ''
  },

  // 解析html
  parseContent (html) {
    const aa = html.replace(/section/g, 'div')
    .replace(/<(img|table) ([\s\S]*?)(\/>|>)/g, '<$1 $2 style="width: 100%!important" />')
    .replace(/<wxs ([\s\S]*?) <\/wxs>/g, '')
      // .split(/<iframe allowfullscreen[\s\S]*?<\/iframe>/g)
    // console.log(aa)
    return aa
  },

  // 获取vid
  getQueryString (url, query) {
    const reg = new RegExp('(^|&)' + query + '=([^&]*)(&|$)', 'i');
    const r = url.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  },

  // 获取文章详情
  getArticleContentById (id) {
    this.setData({ startRep: new Date().getTime() })
    wx.showLoading({
      title: '加载中'
    })
    ajax.get(urls.getArticleContentById(id)).then(res => {
      this.setData({ endRep: new Date().getTime() })
      // const content = res.data.content.content
      // WxParse.wxParse('article', 'html', content, this, 0);
      const content = this.parseContent(res.data.content.content)
      this.setData({ nodes: content })
      this.setData({ vid: this.getQueryString(res.data.content.video_url, 'vid') })
      this.setData({ endParse: new Date().getTime() })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleContentById(options.id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})