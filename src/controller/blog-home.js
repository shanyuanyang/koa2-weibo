/** 
 * @description 微博首页 controller
 * @author syy
*/

const xss = require('xss')
const { createBlog } = require('../services/blog')
const { createBlogFailInfo } = require("../model/ErrorInfo")
const { SuccessModel, ErrorModel } = require("../model/ResModel")

async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}


module.exports = {
  create
}