import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, setTodosACType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, TodolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {keys} from "@material-ui/core/styles/createBreakpoints";
import {AppRootStateType} from "../store";

const initState: TaskStateType = {}
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
export type TaskStateType = {
    [key: string]: TaskType[]
}
export const taskReducer = (state = initState, action: taskReducerACtype): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [
                    action.payload.task,
                    ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-DONE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t, status: action.payload.status} : t)
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
            return {...state, [action.payload.newTodoListId]: []}
        }
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
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = action.payload.tasks
            return stateCopy
        }
        // case "FETCH-TASKS": {
        //     return {...state, [action.payload.todolistId]: action.payload.tasks}
        //
        // }
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
// | fetchTaskThunkCACType


type SecondActionType = {
    type: 'ADD-TASK'
    payload: {
        todolistId: string
        task: TaskType
    }
}

export const addTaskAC = (todolistId:string, task: TaskType): SecondActionType => {
    debugger
    return {
        type: 'ADD-TASK',
        payload: {todolistId, task}
    } as const
}
// type SecondActionType = ReturnType<typeof addTaskAC>

type changeDoneACType = {
    type: 'CHANGE-DONE'
    payload: {
        todolistId: string
        taskId: string
        status: TaskStatuses
    }
}
export const changeDoneAC = (todolistId: string, taskId: string, status: TaskStatuses): changeDoneACType => {
    return {
        type: 'CHANGE-DONE',
        payload: {todolistId, taskId, status}
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
        tasks: TaskType[]
        todolistId: string
    }
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

// export const fetchTaskThunkCAC = (todolistId: string, tasks: TasksApiType[]) => {
//     return {
//         type: 'FETCH-TASKS',
//         payload: {
//             todolistId,
//             tasks
//         }
//     } as const
//
// }
//
// export type fetchTaskThunkCACType = ReturnType<typeof fetchTaskThunkCAC>

// type RemoveTaskACType=ReturnType<typeof removeTaskAC>

// Thunk

export const fetchTaskThunkC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        const pr = TodolistApi.getTasks(todolistId)
        pr.then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
        })
    }
}

export const addTaskThunkC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    debugger
    TodolistApi.addTask(todolistId, title)
        .then((res) => {
            const newTask = res.data.data.item
            dispatch(addTaskAC(todolistId, newTask))
        })
}

export const removeTaskThunkC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    TodolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            const action = removeTaskAC(todolistId, taskId)
            if (res.data.resultCode === 0) {
                dispatch(action)
            }
        })
}

export const changeTaskThunkC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                .then((res)=> {
                    dispatch(changeTitleTaskAC(todolistId, taskId, title))
                })
        }

    }

export const changeTaskStatusThunkC = (todolistId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                .then((res) => {
                    dispatch(changeDoneAC(todolistId, taskId, status))
                })
        }

    }