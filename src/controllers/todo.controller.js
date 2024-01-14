import { z } from "zod";

import {
    getAllTodosService,
    getTodoByIdService,
    createTodoService,
    updateTodoByIdService,
    deleteTodoByIdService
} from '../services/todo.service.js'

export async function getAllTodosController(ctx) {
    try {
        const todos = await getAllTodosService()

        return ctx.json({
            data: todos
        })
    } catch (error) {
        return ctx.json({
            error: error.message
        }, error.statusCode || 500)
    }
}

export async function getTodoByIdController(ctx) {
    const id = ctx.req.param('id')

    try {
        const todo = await getTodoByIdService(id)

        return ctx.json({
            data: todo
        })
    } catch (error) {
        return ctx.json({
            error: error.message
        }, error.statusCode || 500)
    }
}

export async function createTodoController(ctx) {
    let body

    try {
        body = await ctx.req.json()
    } catch (error) {
        return ctx.json({
            error: 'invalid body'
        }, 400)
    }

    if (Object.keys(body).length === 0) {
        return ctx.json({
            error: 'body is empty'
        }, 400)
    }

    const CreateTodoSchema = z.object({
        title: z.string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        }),
        done: z.boolean({
            invalid_type_error: "Done must be a boolean",
        }).optional().default(false),
    });

    try {
        body = CreateTodoSchema.parse(body)
    } catch (error) {
        return ctx.json({
            error: error.issues.map(issue => issue.message).join(', ')
        }, 400)
    }

    try {
        const todo = await createTodoService(body)

        return ctx.json({
            message: 'Todo created successfully',
            data: todo
        })
    } catch (error) {
        return ctx.json({
            error: error.message
        }, error.statusCode || 500)
    }
}

export async function updateTodoByIdController(ctx) {
    const id = ctx.req.param('id')

    let body

    try {
        body = await ctx.req.json()
    } catch (error) {
        return ctx.json({
            error: 'invalid body'
        }, 400)
    }

    if (Object.keys(body).length === 0) {
        return ctx.json({
            error: 'body is empty'
        }, 400)
    }

    const UpdateTodoSchema = z.object({
        title: z.string({
            invalid_type_error: "Title must be a string",
        }).optional(),
        done: z.boolean({
            invalid_type_error: "Done must be a boolean",
        }).optional()
    });

    try {
        UpdateTodoSchema.parse(body)
    } catch (error) {
        return ctx.json({
            error: error.issues.map(issue => issue.message).join(', ')
        }, 400)
    }

    try {
        const updatedTodo = await updateTodoByIdService(id, body)

        return ctx.json({
            message: 'Todo updated successfully',
            data: updatedTodo
        })
    } catch (error) {
        return ctx.json({
            error: error.message
        }, error.statusCode || 500)
    }
}

export async function deleteTodoByIdController(ctx) {
    const id = ctx.req.param('id')

    try {        
        const deletedTodo = await deleteTodoByIdService(id)

        return ctx.json({
            message: 'Todo deleted successfully',
            data: deletedTodo
        })
    } catch (error) {
        return ctx.json({
            error: error.message
        }, error.statusCode || 500)
    }
}