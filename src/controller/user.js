/**
 * @description user controller
 * @author 单远洋
 */

const {
  getUserInfo,
  createUser
} = require('../services/user')

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo
} = require('../model/ErrorInfo')
/**
 * 
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
      password,
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}


module.exports = {
  isExist,
  register
}