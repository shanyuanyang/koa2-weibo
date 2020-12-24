/**
 * @description 微博数据模型
 * @author syy
 */

const seq = require('../seq')
const { TEXT, INTEGER, STRING } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog