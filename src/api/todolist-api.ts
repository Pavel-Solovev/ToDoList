import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '26dce521-0163-43ea-8e20-189a5955d1a9'
    },
})

export const TodolistApi = {
    getTodos: () => {
        return instance.get<TodolistApiType[]>('todo-lists')
    },
    createTodos: (title: string) => {
        return instance.post<CreateTodoResType>(`todo-lists`, {title})
    },
    deleteTodos: (todolistId: string) => {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTitleTodos: (todolistId: string, title:string) => {
        return instance.put(`todo-lists/${todolistId}`, {title})
    }
}

type TodolistApiType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodoResType = {
    data: {
        item: TodolistApiType
    }
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
