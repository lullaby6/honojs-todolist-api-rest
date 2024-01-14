import uuidv4 from '../utils/uuidv4.js'
import ResponseError from '../utils/responseError.js'

const todos = [
    {
        id: uuidv4(2), 
        title: 'Todo 1',
        done: false
    },
]

export async function getAllTodosService() {
    return todos
}

export async function getTodoByIdService(id) {
    const todo = todos.find(todo => todo.id === id)

    if (!todo) {
        throw new ResponseError('todo not found', 404)
    }
    
    return todo
}

export async function createTodoService(data) {
    const id = uuidv4(2)

    const todo = {
        id,
        ...data
    }

    todos.push(todo)

    return todo
}

export async function updateTodoByIdService(id, data) {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if (todoIndex === -1) {
        throw new ResponseError('todo not found', 404)
    }
    
    const todo = todos[todoIndex]

    const updatedTodo = {
        ...todo,
        ...data
    }

    todos[todoIndex] = updatedTodo

    return updatedTodo
}

export async function deleteTodoByIdService(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id)

    if (todoIndex === -1) {
        throw new ResponseError('todo not found', 404)
    }

    const todo = todos[todoIndex]

    todos.splice(todoIndex, 1)

    return todo
}