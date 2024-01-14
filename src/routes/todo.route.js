import { Hono } from 'hono'

import {
    getAllTodosController,
    getTodoByIdController,
    createTodoController,
    updateTodoByIdController,
    deleteTodoByIdController
} from '../controllers/todo.controller.js'

const app = new Hono()

app.get('/', getAllTodosController)
app.get('/:id', getTodoByIdController)
app.post('/', createTodoController)
app.patch('/:id', updateTodoByIdController)
app.delete('/:id', deleteTodoByIdController)

export default app