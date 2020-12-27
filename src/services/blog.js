/**
 * @description 微博 services
 * @author syy
 */

const {
  Blog,
  User,
  UserRelation
} = require('../db/model/index')
const {
  formatUser,
  formatBlog
} = require('./_format')
/**
 * 创建微博
 * @param {*} param0 
 */
async function createBlog({
  content,
  userId,
  image
}) {
  const result = await Blog.create({
    content,
    userId,
    image
  })

  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {object} param0  userName pageIndex pageSize
 */
async function getBlogListByUser({
  userName,
  pageIndex = 0,
  pageSize = 10
}) {

  // 拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize, //每页多少条
    offset: pageIndex * pageSize, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: User,
      attributes: ['userName', 'nickName', 'picture'],
      where: userWhereOpts
    }]
  })

  // 获取 dataValues
  let blogList = result.rows.map(row => row.dataValues)
  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}

/**
 * 获取关注着的微博列表（首页）
 * @param {Object} param0 查询条件 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({
  userId,
  pageIndex = 0,
  pageSize = 10
}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [{
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: {
          userId
        }
      }
    ]
  })

  // 格式化数据
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}





module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
}