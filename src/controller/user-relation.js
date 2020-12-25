/**
 * @description 用户关系controller
 * @author syy
 */
const {
  SuccessModel, ErrorModel
} = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
const { getUsersByFollower, getFollowersByUser, addFollower, deleteFollower } = require('../services/user-relation')
/**
 * 根据userId获取粉丝列表
 * @param {string} userId 用户id
 */
async function getFans(userId) {
  //service
  const { count, userList } = await getUsersByFollower(userId)
  return new SuccessModel({
    count,
    fansList: userList
  })

}

/**
 * 根据userId获取关注人列表
 * @param {number} userId 
 */
async function getFollowers(userId) {
  const { count, userList } = await getFollowersByUser(userId)
  return new SuccessModel({
    count,
    followersList: userList
  })
}

/**
 * 关注
 * @param {number} myUserId 当前登录用户id
 * @param {number} curUserId 要被关注用户id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (ex) {
    console.error(ex)
    return new ErrorModel(addFollowerFailInfo)
  }

}


/**
 * 取消关注
 * @param {number} myUserId 当前登录用户id
 * @param {number} curUserId 要被取消关注用户id
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}


module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow
}