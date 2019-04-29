// pages/test/test.js
const ajax = require('../../utils/ajax.js')
const wxi = require('../../utils/wxi.js')
const urls = require('../../config/urls.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    param: {
      current: 1,
      pageSize: 20,
      order: 'DESC',
      // filterTitle: '老同学',
      orderBy: "id"
    },
    isLoading: false
  },

  // 获取文章列表
  getArticleList () {
    this.enterLoadingState()
    const data = { ...this.data.param, openId: wx.getStorageSync('openid') }
    return ajax.post(urls.getArticleList, data).then(res => {
      const { list, openId, readContentIds } = res.data
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
      console.log(openId, readContentIds)
      this.quitLoadingState();
    })
  },

  // 进入加载状态
  enterLoadingState () {
    this.setData({ isLoading: true })
  },
  
  // 离开加载状态
  quitLoadingState () {
    this.setData({ isLoading: false })
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  // 点击文章
  tapArticle (e) {
    let { item } = e.currentTarget.dataset;
    wx.navigateTo({ url: '../content/content?id=' + item });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.showLoading({ title: '加载中...' })
    wxi.checkSession().then(() => {
      this.getArticleList().then(() => {
        wx.hideLoading()
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作 enablePullDownRefresh false 暂时不开启
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