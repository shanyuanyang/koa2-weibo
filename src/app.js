const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')



const {
  REDIS_CONF
} = require('./conf/db')
const {
  isProd
} = require('./utils/env')
const {
  SESSION_SECRET_KEY
} = require('./conf/secretKeys')


// 路由
const userViewRouter = require('./routes/view/user')
const blogViewRouter = require('./routes/view/blog')
const errorViewRouter = require('./routes/view/error')
const userAPIRouter = require('./routes/api/user')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogProfileAPIRouter = require('./routes/api/blog-profile')
const blogSquareAPIRouter = require('./routes/api/blog-square')
const utilsAPIRouter = require('./routes/api/utils')


// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 单位 ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(userViewRouter.routes(),userViewRouter.allowedMethods())
app.use(blogViewRouter.routes(),blogViewRouter.allowedMethods())
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(),utilsAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(),blogHomeAPIRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(),blogProfileAPIRouter.allowedMethods())
app.use(blogSquareAPIRouter.routes(),blogSquareAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最后面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app