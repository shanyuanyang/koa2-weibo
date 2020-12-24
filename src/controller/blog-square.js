/** 
 * @description 广场 列表
 * @author syy
*/

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')
/**
 * 广场列表
 * @param {*} pageIndex 
 */
async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}


module.exports = {
  getSquareBlogList
}