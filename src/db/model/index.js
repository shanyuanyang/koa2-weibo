/**
 * @description 数据模型入口文件
 * @author syy
 */

const User = require('./User')
const Blog = require('./Blog')
const AtRelation = require('./AtRelation')
const UserRelation = require('./UserRelation')


// blog表有外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// UserRelation表有外键
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  AtRelation,
  UserRelation
}