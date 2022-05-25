import {TodolistApiType} from "../../api/todolist-api";
import {ActionCreator} from "redux";



export type FilterValuesType = "All" | "Active" | "Completed";
const initState: TodolistDomainType[] = []
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
            return [...state, {id: action.payload.newTodoListID, title: action.payload.title, filter: "All", addedDate: '', order:0}]
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

type ActionType = RemoveTodolistACType |
    AddTodolistACType |
    changeTodolistTitleACType |
    changeTodolistFilterACType |
    setTodosACType

export type RemoveTodolistACType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}
// export type RemoveTodolistACType = ActionCreator<typeof RemoveTodoListAC>
export const RemoveTodoListAC = (todolistId1: string): RemoveTodolistACType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id: todolistId1}
    }
}
export type AddTodolistACType = {
    type: 'ADD-TODOLIST'
    payload: {
        newTodoListID:string
        title:string
    }
}
export const AddTodolistAC = (newTodoListID: string, title: string):AddTodolistACType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodoListID, title}
    }
}
type changeTodolistTitleACType = {
    type: 'CHANGE-TODOLIST-TITLE'
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
    type: 'CHANGE-TODOLIST-FILTER'
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
export type setTodosACType = {
    type:'SET-TODOS'
    payload: {
        todos: TodolistApiType[]
    }
}
export const setTodosAC = (todos: TodolistApiType[]):setTodosACType => {
    return {
        type: 'SET-TODOS',
        payload: {todos}
    }
}

