import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import todoRoute from './routes/todo.route.js'

const app = new Hono()
const api = new Hono().basePath('/api')

api.route('/todo', todoRoute)
app.route('/', api)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})