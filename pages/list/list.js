// pages/test/test.js
const ajax = require('../../utils/ajax.js')
const wxi = require('../../utils/wxi.js')
const urls = require('../../config/urls.js')

Page({
  data: {
    articleList: [],
    param: {
      pageSize: 20,
      // filterTitle: '老同学'
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
          title: '暂无数据'
        })
      }
      let { articleList } = this.data
      this.setData({ 
        // 下拉list往下加 上拉刷新为list
        articleList: isAppendBottom ? articleList.concat(list) : list
      })
      // console.log(openId, readContentIds)
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
    wx.stopPullDownRefresh()
  },

  // 点击文章
  tapArticle (e) {
    let { item } = e.currentTarget.dataset;
    wx.navigateTo({ url: '../content/content?id=' + item });
  },

  // 登录获取openid存入storage
  onLoad (options) {
    wx.showLoading({ title: '加载中...' })
    wxi.checkSession().then(() => {
      this.getArticleList().then(() => {
        wx.hideLoading()
      })
    })
  },

  // 监听用户下拉动作
  onPullDownRefresh () {
    let { isLoading } = this.data;
    if (!isLoading) {
      this.getArticleList(false)
    }
  },

  // 监听用户上拉触底事件
  onReachBottom () {
    let { isLoading } = this.data;
    if (!isLoading) {
      this.getArticleList(true)
    }
  }
})