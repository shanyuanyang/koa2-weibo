/**
 * @description user controller
 * @author 单远洋
 */

const {
  getUserInfo,
  createUser,
  deleteUser
} = require('../services/user')

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {string} userName  用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  // console.log('userInfo-----', userInfo)
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 
 * @param {*} param0 注册用户
 */
async function register({
  userName,
  password,
  gender
}) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    console.log('new SuccessModel()----', new SuccessModel())

    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 用户登录
 * @param {} param0  用户名 密码
 */
async function login(ctx, userName, password) {
  // 用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  console.log('userInfo---', userInfo)
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }

  return new SuccessModel()

}



/**
 * 删除当前用户
 * @param {string} userName 
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser
}