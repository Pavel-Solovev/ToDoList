import {
    AddTodolistAC,
    RemoveTodoListAC,
    setTodosAC,
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, TodolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {AppActionType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../helpers/error-helper";

const initState: TaskStateType = {}

export const taskReducer = (state = initState, action: taskReducerACType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [
                    action.payload.task,
                    ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-DONE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, status: action.payload.status} : t)
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, title: action.payload.title} : t)
            }
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.payload.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        default:
            return state
    }
}


// Actions

export const addTaskAC = (todolistId: string, task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            task
        }
    } as const
}

export const changeDoneAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-DONE',
        payload: {
            todolistId,
            taskId,
            status
        }
    } as const
}

export const changeTitleTaskAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {taskId, title, todolistId}
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {
            tasks,
            todolistId
        }
    } as const
}

// Thunk

export const fetchTaskThunkC = (todolistId: string) => {
    return (dispatch: Dispatch<taskReducerACType>) => {
        dispatch(setAppStatusAC('loading'))
        TodolistApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
}

export const addTaskThunkC = (todolistId: string, title: string) => (dispatch: Dispatch<taskReducerACType>) => {
    dispatch(setAppStatusAC('loading'))
    TodolistApi.addTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                // if (res.data.messages.length) {
                //     dispatch(setAppErrorAC(res.data.messages[0])) //для вывода всех ошибок, можно воспользоваться for each
                // } else {
                //     dispatch(setAppErrorAC('Some error occurred'))
                // }
                // dispatch(setAppStatusAC('failed'))
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
        // .finally() // работает всегда после then/catch
}

export const removeTaskThunkC = (todolistId: string, taskId: string) => (dispatch: Dispatch<taskReducerACType>) => {
    dispatch(setAppStatusAC('loading'))
    TodolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const changeTaskThunkC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch<taskReducerACType>, getState: () => AppRootStateType) => {
        const currentTask = getState().tasks[todolistId].find(f => f.id === taskId)
        if (currentTask) {
            const model: UpdateTaskModelType = {
                status: currentTask.status,
                title,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate
            }
            dispatch(setAppStatusAC('loading'))
            TodolistApi.updateTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeTitleTaskAC(todolistId, taskId, title))
                    dispatch(setAppStatusAC('succeeded'))
                })
                .catch((err: AxiosError) => {
                    handleServerNetworkError(dispatch, err.message)
                })
        }
    }

export const changeTaskStatusThunkC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<taskReducerACType>, getState: () => AppRootStateType) => {
        const currentTask = getState().tasks[todolistId].find(f => f.id === taskId)
        if (currentTask) {
            const model: UpdateTaskModelType = {
                status,
                title: currentTask.title,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate
            }
            dispatch(setAppStatusAC('loading'))
            TodolistApi.changeStatusTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeDoneAC(todolistId, taskId, status))
                    dispatch(setAppStatusAC('succeeded'))
                })
                .catch((err: AxiosError) => {
                    handleServerNetworkError(dispatch, err.message)
                })
        }
    }


//  Type

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type taskReducerACType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeDoneAC>
    | ReturnType<typeof changeTitleTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof setTodosAC>
    | AppActionType