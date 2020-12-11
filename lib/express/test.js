// const express = require('./like-express')

// // 本次 http 请求的实例
// const app = express()

// app.use((req, res, next) => {
//   console.log('请求开始...', req.method, req.url)
//   next()
// })

// app.use((req, res, next) => {
//   // 假设在处理 cookie
//   console.log('处理 cookie ...')
//   req.cookie = {
//     userId: 'abc123'
//   }
//   next()
// })

// app.use('/api', (req, res, next) => {
//   console.log('处理 /api 路由')
//   next()
// })

// app.get('/api', (req, res, next) => {
//   console.log('get /api 路由')
//   next()
// })

// // 模拟登录验证
// function loginCheck(req, res, next) {
//   setTimeout(() => {
//     console.log('模拟登陆成功')
//     next()
//   })
// }

// app.get('/api/get-cookie', loginCheck, (req, res, next) => {
//   console.log('get /api/get-cookie')
//   res.json({
//     errno: 0,
//     data: req.cookie
//   })
// })

// app.listen(8000, () => {
//   console.log('server is running on port 8000')
// })

// got
const got = require('got');
const url1 = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx1d553c22be028035&secret=d0848b0dc9c4ae8bb0075a3fcec04700';

(async () => {
  try {
    const res = await got(url1);
    let data = JSON.parse(res.body)
    console.log('data---',data)
  } catch (error) {
    console.log('error:', error);
  }
})();