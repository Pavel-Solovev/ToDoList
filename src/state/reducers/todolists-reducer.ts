import {TodolistApi, TodolistApiType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {addTaskAC} from "./task-reducer";



export type FilterValuesType = "All" | "Active" | "Completed";
const initState: TodolistDomainType[] = []
export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initState, action: todoReducerACType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(e => e.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.payload.newTodoListId, title: action.payload.title, filter: "All", addedDate: '', order: 0}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(e => e.id === action.payload.id ? {...e, title: action.payload.title} : e)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(e => e.id === action.payload.id ? {...e, filter: action.payload.filter} : e)
        }
        case 'SET-TODOS' :{
            return action.payload.todos.map((tl)=>{
                return {...tl, filter: 'All'}
            })
        }
        default:
            return state
    }
}

type todoReducerACType =
    | ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodosAC>

export const RemoveTodoListAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const AddTodolistAC = (newTodoListId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodoListId,
            title
        }
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}

export const setTodosAC = (todos: TodolistApiType[]) => {
    return {
        type: 'SET-TODOS',
        payload: {
            todos
        }
    } as const
}

// Thunk

export const fetchTodolistThunkC = () => (dispatch: Dispatch) => {
    const pr = TodolistApi.getTodos()
    pr.then((res)=>{
        dispatch(setTodosAC(res.data))
    })
}

export const RemoveTodoListThunkC = (todolistId: string) => (dispatch: Dispatch) => {
    debugger
    TodolistApi.deleteTodos(todolistId)
    .then((res)=>{
        dispatch(RemoveTodoListAC(todolistId))
    })
}

export const AddTodolistThunkC = (title: string) => (dispatch: Dispatch) => {
    debugger
    TodolistApi.createTodos(title)
        .then((res)=>{
            dispatch(AddTodolistAC(res.data.data.item.id, title))
        })
}

export const changeTodolistTitleThunkC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    TodolistApi.updateTitleTodos(todolistId, title)
        .then((res)=>{
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

