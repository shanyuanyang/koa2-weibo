/**
 * @description 微博view路由
 * @author syy
 */

const router = require('koa-router')()

const { loginRedirect } = require('../../middlewares/loginChecks')


// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  //获取第一页数据
  // const result = await 
  
  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: 0,
        list: []
      },
      followersData: {
        count: 0,
        list: []
      },
      atCount: true
    },
    blogData: {
      isEmpty: true,
      blogList: [],
      pageSize: 10,
      pageIndex: 1,
      count: 10
    }
  })
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  await ctx.render('profile', {})
})

module.exports = router