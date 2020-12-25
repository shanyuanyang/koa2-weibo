/**
 * @description user service
 * @author 单远洋
 */

const User = require('../db/model/User')
const { addFollower } = require('./user-relation')
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
  // 自己关注自己 为了首页方便获取数据
  addFollower(data.id, data.id)

  return data
}

/**
 *删除当前用户
 * @param {string} userName 
 */
async function deleteUser(userName) {
  const res = await User.destroy({
    where: {
      userName
    }
  })
  return res > 0
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */

async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
  // 拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }

  // 拼接查询条件
  const whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  })
  return result[0] > 0 // 修改的行数
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}