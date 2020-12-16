/**
 * @description user service
 * @author 单远洋
 */

const User = require('../db/model/User')

const {
  formatUser
} = require('./_format')
/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {
      password
    })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  // console.log('result---', result)

  if (result == null) {
    return result
  }
  //格式化
  const formatRes = formatUser(result.dataValues)

  return formatRes
}


/**
 * 
 * @param {*} param0 创建用户
 */
async function createUser({
  userName,
  password,
  gender = 3,
  nickName
}) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName || userName
  })
  const data = result.dataValues
  console.log('data-----', data)
  return data
}
module.exports = {
  getUserInfo,
  createUser
}