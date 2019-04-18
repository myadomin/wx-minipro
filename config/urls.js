const ctx = 'https://www.b1026.com/api'
// const ctx = 'http://127.0.0.1:7001'

module.exports = {
  getArticleList: `${ctx}/article/list`,
  deleteArticleList: `${ctx}/article/delete`,
  getArticleContentById: (id) => `${ctx}/article/content?id=${id}`
}