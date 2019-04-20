// pages/test/test.js
const ajax = require('../../utils/ajax.js')
const urls = require('../../config/urls.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    param: {
      current: 1,
      pageSize: 10
    },
    isLoading: false
  },

  // 获取文章列表
  getArticleList () {
    this.enterLoadingState()
    ajax.post(urls.getArticleList, this.data.param).then(res => {
      const list = res.data.list
      if (!list.length) return
      let { articleList, param } = this.data
      if (param.current === 1) {
        articleList = []
      }
      if (list.length > 0) {
        param.current++;
      }
      this.setData({ 
        articleList: articleList.concat(list),
        param: param
      })
      // console.log(param, list, articleList.concat(list))
      this.quitLoadingState();
    })
  },

  // 进入加载状态
  enterLoadingState () {
    this.setData({
      isLoading: true
    })
  },
  
  // 离开加载状态
  quitLoadingState () {
    this.setData({
      isLoading: false
    })
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  // 点击文章
  tapArticle (e) {
    let { item } = e.currentTarget.dataset;
    wx.navigateTo({ url: '../articleContent/articleContent?id=' + item });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getArticleList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    this.setData({ param: { ...this.data.param, current: 1 } })
    this.getArticleList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    let { isLoading } = this.data;
    if (!isLoading) {
      this.getArticleList();
    }
  }
})