import axios, {AxiosResponse} from "axios";
import {Login} from "../features/Login/login";

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
    updateTask: (todolistId: string, taskId:string, model: UpdateTaskModelType) => {
        return instance.put<UpdateTaskModelType, AxiosResponse<CommonResponseType<{ item: TasksApiType }>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    changeStatusTask: (todolistId: string, taskId:string, model: UpdateTaskModelType) => {
        return instance.put<UpdateTaskModelType, AxiosResponse<CommonResponseType<{ item: TasksApiType }>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<CommonResponseType<{ userId: number }>>>('/auth/login', data)
    },
    me() {
        return instance.get<CommonResponseType<MeResponseType>>('auth/me')
    },
    logout() {
        return instance.delete<CommonResponseType>('/auth/login')
    },
}

export enum LoginStatuses {
    ok = 0,
    invalid = 1,
    invalidAndCaptcha = 10
}

export type LoginParamsType = {
    email:string
    password:string
    rememberMe?:boolean
    captcha?:string
}

export type MeResponseType = {
    id: number
    email:string
    login:string
}

// export type LoginParamsType = {
//     resultCode: LoginStatuses
//     message: string[]
//     data: {
//         userId: number
//     }
// }

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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type integer = number
type datetime = string
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: datetime
    deadline: datetime
    id: string
    todolistId: string
    order: integer
    addedDate: datetime
}

export type UpdateTaskModelType = {
    title:string
    description:string
    status:TaskStatuses
    priority:TaskPriorities
    startDate:datetime
    deadline:datetime
}

export type CommonResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}