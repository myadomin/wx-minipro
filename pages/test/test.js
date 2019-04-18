// pages/test/test.js
const ajax = require('../../utils/ajax.js')
const urls = require('../../config/urls.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  testPost () {
    const data = {
      current: 3,
      pageSize: 5
    }
    ajax.post(urls.getArticleList, data).then(res => {
      console.log(res)
    })
  },

  testGet() {
    ajax.get(urls.getArticleContentById(225)).then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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