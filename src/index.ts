import app from './server'
import { createServer } from 'http'

const server = createServer(app)
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`connected to http://localhost:${PORT}`)
})
