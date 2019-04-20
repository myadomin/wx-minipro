// pages/articleContent/articleContent.js
const ajax = require('../../utils/ajax.js')
const urls = require('../../config/urls.js')
const WxParse = require('../../libs/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  // 获取文章详情
  getArticleContentById (id) {
    ajax.get(urls.getArticleContentById(id)).then(res => {
      console.log(res)
      const content = res.data.content.content
      WxParse.wxParse('article', 'html', content, this, 0);
      this.setData({ content: res.data.content.content })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
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