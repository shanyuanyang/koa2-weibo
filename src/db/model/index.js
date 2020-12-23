/**
 * @description 数据模型入口文件
 * @单远洋
 */

const User = require('./User')
const Blog = require('./Blog')


// blog表有外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})


module.exports = {
  User,
  Blog
}