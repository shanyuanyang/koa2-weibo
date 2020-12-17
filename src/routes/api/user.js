/**
 * @description user api
 * @author 单远洋
 * 
 */

const router = require('koa-router')()
const {
  isExist,
  register
} = require('../../controller/user')
const {
  genValidator
} = require('../../middlewares/validator')
const userValidate = require('../../validator/user')


router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, ndext) => {
  const {
    userName,
    password,
    gender
  } = ctx.request.body
  console.log(userName, password, gender)
  ctx.body = await register({
    userName,
    password,
    gender
  })
})
// 用户名是否存在
router.post('/isExist', async (ctx, ndext) => {
  // console.log(11111111111111)
  const {
    userName
  } = ctx.request.body
  ctx.body = await isExist(userName)


})

module.exports = router