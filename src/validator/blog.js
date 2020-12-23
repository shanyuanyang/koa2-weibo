/** 
 * @description blog validator
 * @author syy
*/

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}


function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = {
  blogValidate
}