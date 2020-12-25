/**
 * @description 个人主页 API路由
 * @author syy
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getBlogListStr } = require('../../utils/blog')
const { follow, unFollow } = require('../../controller/user-relation')

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

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  const result = await follow(myUserId, curUserId)
  ctx.body = result
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  const result = await unFollow(myUserId, curUserId)
  ctx.body = result
})

module.exports = router