import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

import todoRoute from './routes/todo.route.js'

const app = new Hono()
const api = new Hono().basePath('/api')

app.get('*', serveStatic({
	root: './src/public/'
}))

api.route('/todo', todoRoute)
app.route('/', api)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
	fetch: app.fetch,
	port
})