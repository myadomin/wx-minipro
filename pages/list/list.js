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
      pageSize: 10
    },
    isLoading: false
  },

  // 获取文章列表
  getArticleList (isAppendBottom) {
    this.enterLoadingState()
    const data = { ...this.data.param, openId: wx.getStorageSync('openId') }
    return ajax.post(urls.getArticleList, data).then(res => {
      const { list, openId, readContentIds } = res.data
      if (!list.length) {
        wx.showToast({
          title: '返回的是空数组'
        })
        return
      }
      let { articleList, param } = this.data
      this.setData({ 
        // 下拉list往下加 上拉list往上加
        articleList: isAppendBottom ? articleList.concat(list) : list.concat(articleList)
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
    let { isLoading } = this.data;
    if (!isLoading) {
      this.getArticleList(false)
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    let { isLoading } = this.data;
    if (!isLoading) {
      this.getArticleList(true)
    }
  }
})