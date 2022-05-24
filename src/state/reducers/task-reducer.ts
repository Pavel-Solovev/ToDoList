import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

const initState: TaskStateType = {}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export const taskReducer = (state = initState, action: taskReducerACtype): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {...state,
            [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false},
                ...state[action.payload.todolistId]]}
        }
        case "CHANGE-DONE": {
            return {...state,
            [action.payload.todolistId]: state[action.payload.todolistId]
                .map(t => t.id === action.payload.taskId
                ? {...t, isDone: action.payload.isDone} : t)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {...state,
            [action.payload.todolistId]: state[action.payload.todolistId]
                .map(t => t.id === action.payload.taskId
                ? {...t, title: action.payload.title} : t)
            }
        }
        case "REMOVE-TASKS":{
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newTodoListID]: []}
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        default:
            return state
    }
}

type taskReducerACtype = SecondActionType | changeDoneACType | changeTitleTaskACType | RemoveTaskACType | RemoveTodolistACType | AddTodolistACType


type SecondActionType  = {
    type: 'ADD-TASK'
    payload: {
        title:string
        todolistId:string
    }
}
export const addTaskAC = (todolistId:string, title:string):SecondActionType => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}
// type SecondActionType = ReturnType<typeof addTaskAC>

type changeDoneACType = {
    type: 'CHANGE-DONE'
    payload: {
        todolistId:string
        taskId:string
        isDone: boolean
    }
}
export const changeDoneAC = (todolistId:string, taskId:string, isDone: boolean):changeDoneACType => {
    return {
        type: 'CHANGE-DONE',
        payload: {taskId, isDone, todolistId}
    } as const
}
// type changeDoneACType = ReturnType<typeof changeDoneAC>

type changeTitleTaskACType = {
    type: 'CHANGE-TITLE-TASK'
    payload: {
        todolistId:string
        taskId:string
        title: string
    }
}
export const changeTitleTaskAC = (todolistId:string, taskId:string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {taskId, title, todolistId}
    } as const
}
// type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>

type RemoveTaskACType = {
    type:'REMOVE-TASKS'
    payload: {
        todolistId: string
        taskId:string
    }
}
export const removeTaskAC=(todolistId: string, taskId:string)=>{
    return{
        type:'REMOVE-TASKS',
        payload: {todolistId, taskId}
    } as const
}

// type RemoveTaskACType=ReturnType<typeof removeTaskAC>

