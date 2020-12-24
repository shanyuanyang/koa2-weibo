/**
 * @description 微博 @ 用户的关系，数据模型
 * @author syy
*/


const seq = require('../seq')
const { INTEGER } = require('../types')
const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户 ID'
  },
})

module.exports = UserRelation