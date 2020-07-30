const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./db.js')
const middlewares = jsonServer.defaults()
server.use(middlewares)

server.use(jsonServer.rewriter({
  '/api/login': '/user_login',
}))

server.use(jsonServer.router(db))
server.listen(3000, () => {
  console.log('JSON Server is running')
})