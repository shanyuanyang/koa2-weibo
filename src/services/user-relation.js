/**
 * @description 用户关系 service
 * @author syy
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')


/**
 * 获取该用户的粉丝
 * @param {number} followerId 被关注人id
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            [Sequelize.Op.ne]: followerId //不包括自己
          }
        }
      }
    ]
  })
  // result.count 是总数  result.rows查询结果 是数组 
  //格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)
  return {
    count: result.count,
    userList
  }
}

/**
 * 获取关注人列表
 * @param {number} userId  
 */
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId //不包括自己
      }
    }
  })

  // 处理数据
  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user
    user = user.dataValues
    user = formatUser(user)
    return user
  })
  return {
    count: result.count,
    userList
  }

}


/**
 * 添加关注关系
 * @param {number} userId 当前登录用户id
 * @param {number} followerId  要被关注用户id
 */
async function addFollower(userId, followerId) {
  const result = UserRelation.create({
    userId,
    followerId
  })
  console.log('result-------', result)
  return result.dataValues
}

/**
 * 取消关注关系
 * @param {number} userId 当前登录用户id
 * @param {number} followerId  要被关注用户id
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}
module.exports = {
  getUsersByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower
}