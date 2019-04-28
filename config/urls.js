// const ctx = 'https://www.b1026.com/api'
// 详情不校验 请求本地nodejs
const ctx = 'http://127.0.0.1:7001'

module.exports = {
  getArticleList: `${ctx}/wx/article/list`,
  getArticleContentById: `${ctx}/wx/article/content`,
  getOpenIdByCode: `${ctx}/wx/user/login`
}