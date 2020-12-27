/** 
 * @description 微博 @ 用户的关系，数据模型
 * @author syy
*/

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')
const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博ID'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, 
    comment: '是否已读'
  }
})

module.exports = AtRelation