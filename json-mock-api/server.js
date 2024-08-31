const jsonServer = require('json-server')
const cors = require('cors')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Enable CORS for all routes
server.use(cors({ origin: 'http://irentstuff-client.s3-website-ap-southeast-1.amazonaws.com' }))

server.use(middlewares)
server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000')
})
