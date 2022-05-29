import axios, {AxiosResponse} from "axios";

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
        return instance.post<any, AxiosResponse<CommonResponseType<{ item: TodolistApiType }>>, { title: string }>(`todo-lists`, {title})
    },
    deleteTodos: (todolistId: string) => {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTitleTodos: (todolistId: string, title: string) => {
        return instance.put<any, AxiosResponse<CommonResponseType<{ item: TodolistApiType }>>, { title: string }>(`todo-lists/${todolistId}`, {title})
    },
    getTasks: (todolistId: string) => {
        return instance.get<TasksApiType>( `/todo-lists/${todolistId}/tasks`)
    },
    addTask: (todolistId: string, title: string) => {
        return instance.post<CommonResponseType<{ item: TaskType}>>( `/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId:string) => {
        return instance.delete<CommonResponseType<{ item: TasksApiType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId:string, title: string) => {
        return instance.put<any, AxiosResponse<CommonResponseType<{ item: TasksApiType }>>, { title: string }>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }

}

export type TodolistApiType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TasksApiType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type integer = number
type datetime = string
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: integer
    priority: integer
    startDate: datetime
    deadline: datetime
    id: string
    todolistId: string
    order: integer
    addedDate: datetime
}

type CommonResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}