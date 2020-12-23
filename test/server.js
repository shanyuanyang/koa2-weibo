/**
 * @description jest server
 * @author syy
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)
