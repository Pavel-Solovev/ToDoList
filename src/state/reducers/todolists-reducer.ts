import {FilterValuesType, TodoListType} from "../../App";
import {v1} from "uuid";

export const todolistsReducer= (state: Array<TodoListType>, action: todolistsReducerACtype)=>{
    switch (action.type) {
        // case 'CHANGE-FILTER' :{
        //     return state
        // }
        case "REMOVE-TODOLIST":{
            return state.filter(e=>e.id!==action.payload.id)
        }
        case "ADD-TODOLIST":{
            return [...state, {id: v1(), title: action.payload.title, filter: "All"}]
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(e=>e.id===action.payload.id ? {...e, title: action.payload.title} : e)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(e=>e.id === action.payload.id ? {...e, filter: action.payload.filter} : e)
        }
        default:
            return state
    }
}

type todolistsReducerACtype = RemoveTodolistACType |
    AddTodolistACType |
    changeTodolistTitleACType |
    changeTodolistFilterACType

type RemoveTodolistACType=ReturnType<typeof RemoveTodoListAC>

export const RemoveTodoListAC =(todolistId1:string)=>{
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1
        }
    } as const
}
type AddTodolistACType=ReturnType<typeof AddTodolistAC>
export const AddTodolistAC=(title:string)=>{
    return {
        type: 'ADD-TODOLIST',
        payload: {title}
    } as const
}
type changeTodolistTitleACType=ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
      type: 'CHANGE-TODOLIST-TITLE',
      payload: {id, title}

    } as const
}
type changeTodolistFilterACType=ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
  return {
      type: 'CHANGE-TODOLIST-FILTER',
      payload: {id, filter}
  } as const
}