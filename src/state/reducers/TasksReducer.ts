import {TaskStateType} from "../../App";



export const TasksReducer=(state:Array<TaskStateType>, action:ActionsTasksType)=>{
    switch (action.type){
        case "REMOVE-TASKS":{
            console.log("REMOVE-TASKS")
        }
        default: return state
    }
}
type ActionsTasksType=RemoveTaskACType
type RemoveTaskACType=ReturnType<typeof removeTaskAC>
export const removeTaskAC=()=>{
    return{
        type:'REMOVE-TASKS'
    } as const
}