const baseURL = "http://localhost:3000/api/todo"

describe("POST /api/todo", () => {
    test("should return 201", async () => {
        const todo = {
            title: "test",
            done: false
        }

        try {
            const res = await fetch(baseURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            })
            const data = await res.json()
            createdTodoId = data.id
            expect(res.status).toBe(201)
        } catch (error) {
            console.log(error);
        }
    })
})

describe("GET /api/todo", () => {
    test("should return 200", async () => {
        try {
            const res = await fetch(baseURL)
            expect(res.status).toBe(200)
        } catch (error) {
            console.log(error);
        }
    })
})

// describe("GET /api/todo/:id", () => {
//     test("should return 200", async () => {
//         try {
//             const res = await fetch(`${baseURL}/${todoId}`)
//             expect(res.status).toBe(200)
//         } catch (error) {
//             console.log(error);
//         }
//     })
// })

// describe("DELETE /api/todo/:id", () => {
//     test("should return 200", async () => {
//         try {
//             const res = await fetch(`${baseURL}/${todoId}`, {
//                 method: "DELETE"
//             })
//             expect(res.status).toBe(200)
//         } catch (error) {
//             console.log(error);
//         }
//     })
// })