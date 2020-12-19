/**
 * @description user api
 * @author 单远洋
 * 
 */

const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  deleteCurUser
} = require('../../controller/user')
const {
  genValidator
} = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
const { loginCheck } = require('../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')


router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const {
    userName,
    password,
    gender
  } = ctx.request.body
  // console.log(userName, password, gender)
  ctx.body = await register({
    userName,
    password,
    gender
  })
})
// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const {
    userName
  } = ctx.request.body
  ctx.body = await isExist(userName)

})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', async (ctx, next) => {
  if (isTest) {
    // 只能删除自己的账号
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }


})

module.exports = router