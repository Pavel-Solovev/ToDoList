import {TaskStateType, TodoListType} from "../../App";
import {v1} from "uuid";

export const taskReducer = (state: TaskStateType, action: taskReducerACtype) => {
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
                ? {...t, isDOne: action.payload.isDone} : t)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {...state,
            [action.payload.todolistId]: state[action.payload.todolistId]
                .map(t => t.id === action.payload.taskId
                ? {...t, title: action.payload.title} : t)
            }
        }
        default:
            return state
    }
}

type taskReducerACtype = FirstActionType | SecondActionType | changeDoneACType | changeTitleTaskACType



export const FirstActionTypeAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskId, todolistId}
    } as const
}
type FirstActionType = ReturnType<typeof FirstActionTypeAC>

export const addTaskAC = (title:string, todolistId:string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}
type SecondActionType = ReturnType<typeof addTaskAC>

export const changeDoneAC = (taskId:string, isDone: boolean, todolistId:string) => {
    return {
        type: 'CHANGE-DONE',
        payload: {taskId, isDone, todolistId}
    } as const
}
type changeDoneACType = ReturnType<typeof changeDoneAC>

export const changeTitleTaskAC = (taskId:string, title: string, todolistId:string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {taskId, title, todolistId}
    } as const
}
type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>