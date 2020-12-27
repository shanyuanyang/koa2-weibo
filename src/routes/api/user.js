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
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user')
const {
  genValidator
} = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
const {
  loginCheck
} = require('../../middlewares/loginChecks')
const {
  isTest
} = require('../../utils/env')
const {
  getFollowers
} = require('../../controller/user-relation')

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
  const {
    userName,
    password
  } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', async (ctx, next) => {
  if (isTest) {
    // 只能删除自己的账号
    const {
      userName
    } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const {
    nickName,
    city,
    picture
  } = ctx.request.body
  ctx.body = await changeInfo(ctx, {
    nickName,
    city,
    picture
  })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const {
    password,
    newPassword
  } = ctx.request.body
  const {
    userName
  } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})
// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})


// 获取 at 列表，即关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const {
    id: userId
  } = ctx.session.userInfo
  const result = await getFollowers(userId)
  const {
    followersList
  } = result.data
  const list = followersList.map(user => {
    return `${user.nickName} - ${user.userName}`
  })
  // 格式如 ['张三 - zhangsan', '李四 - lisi', '昵称 - userName']
  ctx.body = list
})

module.exports = router