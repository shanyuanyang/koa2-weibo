/**
 * @description 微博 services
 * @author syy
 */

const { Blog } = require('../db/model/index')

/**
 * 创建微博
 * @param {*} param0 
 */
async function createBlog({ content, userId, image }) {
  const result = await Blog.create({
    content,
    userId,
    image
  })
  return result.dataValues
}

module.exports={
  createBlog
}