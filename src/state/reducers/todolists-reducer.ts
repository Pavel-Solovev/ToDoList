import {TodolistApi, TodolistApiType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {v1} from "uuid";



export type FilterValuesType = "All" | "Active" | "Completed";
const initState: TodolistDomainType[] = []
export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}
// const initState: Array<TodoListType> [state, setState] = useState<Array<TodoListType>>([])

export const todolistsReducer = (state: Array<TodolistDomainType> = initState, action: ActionType): Array<TodolistDomainType> => {
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

type ActionType = RemoveTodolistACType |
    AddTodolistACType |
    changeTodolistTitleACType |
    changeTodolistFilterACType |
    setTodosACType

export type RemoveTodolistACType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todolistId: string
    }
}
// export type RemoveTodolistACType = ActionCreator<typeof RemoveTodoListAC>
export const RemoveTodoListAC = (todolistId: string): RemoveTodolistACType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    }
}
export type AddTodolistACType = {
    type: 'ADD-TODOLIST'
    payload: {
        newTodoListId:string
        title:string
    }
}
export const AddTodolistAC = (newTodoListId: string, title: string):AddTodolistACType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodoListId,
            title
        }
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

