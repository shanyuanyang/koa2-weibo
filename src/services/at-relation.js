/** 
 * @description 微博 @ service
 * @author syy
 * 
 */

const {
  AtRelation,
  Blog,
  User,
  UserRelation
} = require('../db/model/index')
const {
  formatUser,
  formatBlog
} = require('./_format')


/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博 id
 * @param {number} userId 用户 id
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}

/**
 *获取 @ 用户的微博数量 未读的
 * @param {number} userId 
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}


/**
 * 获取 @ 用户的微博列表
 * @param {*} param0 
 */
async function getAtUserBlogList({
  userId,
  pageIndex,
  pageSize = 10
}) {
  console.log('userId----', userId)
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      // 关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      // 用户
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })
  // 处理数据
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blog => {
    blog.user = formatUser(blog.user.dataValues)
    return blog
  })
  return {
    count: result.count,
    blogList
  }
}


/**
 * 更新 AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation({
  newIsRead
}, {
  userId,
  isRead
}) {
  // 拼接更新内容
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }

  // 拼接查询条件
  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }

  // 执行更新
  const result = await AtRelation.update(updateData, {
    where: whereData
  })
  return result[0] > 0
}


module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
}