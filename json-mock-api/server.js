const jsonServer = require('json-server')
const cors = require('cors')
const path = require('path')

// Create the server
const server = jsonServer.create()

// Set up the router
const router = jsonServer.router(path.join(__dirname, 'src/db.json'))

// Set up default middlewares (logger, static, cors, no-cache)
const middlewares = jsonServer.defaults()

// Enable CORS with specific origin
server.use(
  cors({
    origin: 'http://irentstuff-client.s3-website-ap-southeast-1.amazonaws.com',
    optionsSuccessStatus: 200
  })
)

// Use default middlewares
server.use(middlewares)

// Use the custom router
server.use(router)

// Start the server on a specific port
const PORT = 5000
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})
