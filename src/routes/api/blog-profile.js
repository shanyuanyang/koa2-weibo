/**
 * @description 个人主页 API路由
 * @author syy
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let {
    userName,
    pageIndex
  } = ctx.params
  pageIndex = parseInt(pageIndex)
  // console.log(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  // console.log('result----', result)
  // 渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})




module.exports = router