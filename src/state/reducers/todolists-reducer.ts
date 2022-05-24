import {TodolistApiType} from "../../api/todolist-api";
import {ActionCreator} from "redux";



export type FilterValuesType = "All" | "Active" | "Completed";
const initState: Array<TodolistDomainType> = []
export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}
// const initState: Array<TodoListType> [state, setState] = useState<Array<TodoListType>>([])

export const todolistsReducer = (state: Array<TodolistDomainType> = initState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(e => e.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.id, title: action.payload.title, filter: "All", addedDate: '', order:0}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(e => e.id === action.payload.id ? {...e, title: action.payload.title} : e)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(e => e.id === action.payload.id ? {...e, filter: action.payload.filter} : e)
        }
        case 'SET-TODOS' :{
            return state
        }
        default:
            return state
    }
}

type ActionType = RemoveTodolistACType |
    AddTodolistACType |
    changeTodolistTitleACType |
    changeTodolistFilterACType
    // setTodosACType

export type RemoveTodolistACType = {
    type: string
    payload: {
        id: string
    }
}
// export type RemoveTodolistACType = ActionCreator<typeof RemoveTodoListAC>
export const RemoveTodoListAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id: todolistId1}
    } as const
}
export type AddTodolistACType = {
    type: string
    payload: {
        newTodoListID:string
        title:string
    }
}
export const AddTodolistAC = (newTodoListID: string, title: string):AddTodolistACType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodoListID, title}
    } as const
}
type changeTodolistTitleACType = {
    type: string
    payload: {
        id: string
        title: string
    }
}
export const changeTodolistTitleAC = (id: string, title: string): changeTodolistTitleACType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}

    } as const
}
type changeTodolistFilterACType = {
    type: string
    payload: {
        id: string
        filter: FilterValuesType
    }
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType):changeTodolistFilterACType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}
// type setTodosACType = {
//     type:string
//     payload: {
//         todos: TodoListType[]
//     }
// }
// export const setTodosAC = (todos: TodoListType[]):setTodosACType => {
//     return {
//         type: 'SET-TODOS',
//         payload: {todos}
//     }
// }

