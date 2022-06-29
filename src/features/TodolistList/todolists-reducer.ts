import {TodolistApi, TodolistApiType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk} from "../../app/store";
import {AppActionType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";


const initState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initState, action: todoReducerACType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(e => e.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: "All", entityStatus: 'idle'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(e => e.id === action.payload.id ? {...e, title: action.payload.title} : e)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(e => e.id === action.payload.id ? {...e, filter: action.payload.filter} : e)
        case 'SET-TODOS' :
            return action.payload.todos.map((tl) => {
                return {...tl, filter: 'All', entityStatus: 'idle'}
            })
        case "CHANGE-TODO-ENTITY-STATUS":
            return state.map(e=>e.id === action.payload.id ? {...e, entityStatus: action.payload.entityStatus} : e)
        default:
            return state
    }
}

//  Actions

export const RemoveTodoListAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const AddTodolistAC = (todolist: TodolistApiType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
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

export const changeTodoEntityStatusAC = (id: string, entityStatus:RequestStatusType) => {
    return {
        type: 'CHANGE-TODO-ENTITY-STATUS',
        payload: {
            id,
            entityStatus
        }
    } as const
}

// Thunk

export const fetchTodolistThunkC = () => (dispatch: Dispatch<todoReducerACType>) => {
    dispatch(setAppStatusAC('loading'))
    TodolistApi.getTodos()
        .then((res) => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

// export const RemoveTodoListThunkC = (todolistId: string): AppThunk => (dispatch) => {
//     TodolistApi.deleteTodos(todolistId)
//         .then(() => {
//             dispatch(fetchTodolistThunkC())
//         })
// }

export const RemoveTodoListThunkC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeTodoEntityStatusAC(todolistId, 'loading'))
    dispatch(setAppStatusAC('loading'))
    TodolistApi.deleteTodos(todolistId)
        .then(() => {
            dispatch(RemoveTodoListAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTodoEntityStatusAC(todolistId, 'succeeded'))
        })
}

// export const AddTodolistThunkC = (title: string): AppThunk => (dispatch) => {
//     TodolistApi.createTodos(title)
//         .then((res) => {
//             dispatch(fetchTodolistThunkC())
//         })
// }

export const AddTodolistThunkC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    TodolistApi.createTodos(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }

        })
}

export const changeTodolistTitleThunkC = (todolistId: string, title: string) =>
    (dispatch: Dispatch<todoReducerACType>) => {
        dispatch(setAppStatusAC('loading'))
        TodolistApi.updateTitleTodos(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
// type

export type todoReducerACType =
    | ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodosAC>
    | ReturnType<typeof changeTodoEntityStatusAC>
    | AppActionType
export type FilterValuesType = "All" | "Active" | "Completed";
export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}