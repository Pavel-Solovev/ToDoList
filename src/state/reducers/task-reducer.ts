import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, setTodosACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TasksApiType, TodolistApi} from "../../api/todolist-api";
import {keys} from "@material-ui/core/styles/createBreakpoints";

const initState: TaskStateType = {}
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
export type TaskStateType = {
    [key: string]: Array<TasksApiType>
}
export const taskReducer = (state = initState, action: taskReducerACtype): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return <TaskStateType>{
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    completed: false,
                    description: '',
                    status: 0,
                    priority: 0,
                    startDate: new Date,
                    deadline: '',
                    order: 0,
                    addedDate: new Date
                },
                    ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-DONE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, completed: action.payload.completed} : t)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title} : t)
            }
        }
        case "REMOVE-TASKS": {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newTodoListID]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.payload.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        default:
            return state
    }
}

type taskReducerACtype =
    SecondActionType
    | changeDoneACType
    | changeTitleTaskACType
    | RemoveTaskACType
    | RemoveTodolistACType
    | AddTodolistACType
    | setTodosACType
    | SetTasksACType


type SecondActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
        todolistId: string
    }
}
export const addTaskAC = (todolistId: string, title: string): SecondActionType => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}
// type SecondActionType = ReturnType<typeof addTaskAC>

type changeDoneACType = {
    type: 'CHANGE-DONE'
    payload: {
        todolistId: string
        taskId: string
        completed: boolean
    }
}
export const changeDoneAC = (todolistId: string, taskId: string, completed: boolean): changeDoneACType => {
    return {
        type: 'CHANGE-DONE',
        payload: {taskId, completed, todolistId}
    } as const
}
// type changeDoneACType = ReturnType<typeof changeDoneAC>

type changeTitleTaskACType = {
    type: 'CHANGE-TITLE-TASK'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}
export const changeTitleTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {taskId, title, todolistId}
    } as const
}
// type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>

type RemoveTaskACType = {
    type: 'REMOVE-TASKS'
    payload: {
        todolistId: string
        taskId: string
    }
}
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {todolistId, taskId}
    } as const
}

export type SetTasksACType = {
    type: 'SET-TASKS'
    payload: {
        tasks: TasksApiType[]
        todolistId: string
    }
}

export const setTasksAC = (tasks: TasksApiType[], todolistId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {
            tasks: tasks,
            todolistId: todolistId
        }
    }
}

// type RemoveTaskACType=ReturnType<typeof removeTaskAC>

// Thunk

export const fetchTaskThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        const pr = TodolistApi.getTasks(todolistId)
        pr.then((res) => {
            const tasks = res.data.data.item
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)

        })
    }
}


