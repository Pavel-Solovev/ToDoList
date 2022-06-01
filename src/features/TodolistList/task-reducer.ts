import {
    AddTodolistAC,
    RemoveTodoListAC,
    setTodosAC,
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, TodolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";

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
            return {...state, [action.payload.newTodoListId]: []}
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
        const pr = TodolistApi.getTasks(todolistId)
        pr.then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
    }
}

export const addTaskThunkC = (todolistId: string, title: string) => (dispatch: Dispatch<taskReducerACType>) => {
    TodolistApi.addTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(todolistId, res.data.data.item))
        })
}

export const removeTaskThunkC = (todolistId: string, taskId: string) => (dispatch: Dispatch<taskReducerACType>) => {
    TodolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}

export const changeTaskThunkC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch<taskReducerACType>, getState: () => AppRootStateType) => {
        const allTasks = getState().tasks
        const currentTask = allTasks[todolistId].find(f => f.id === taskId)
        if (currentTask) {
            const model: UpdateTaskModelType = {
                status: currentTask.status,
                title,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate
            }
            TodolistApi.updateTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeTitleTaskAC(todolistId, taskId, title))
                })
        }
    }

export const changeTaskStatusThunkC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch<taskReducerACType>, getState: () => AppRootStateType) => {
        const state = getState()
        const allTasks = state.tasks
        const tasksForClickedTodo = allTasks[todolistId]
        const currentTask = tasksForClickedTodo.find(f => f.id === taskId)
        if (currentTask) {
            const model: UpdateTaskModelType = {
                status,
                title: currentTask.title,
                deadline: currentTask.deadline,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate
            }
            TodolistApi.changeStatusTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeDoneAC(todolistId, taskId, status))
                })
        }
    }


//  Type

export type TaskStateType = {
    [key: string]: TaskType[]
}

type taskReducerACType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeDoneAC>
    | ReturnType<typeof changeTitleTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof setTodosAC>