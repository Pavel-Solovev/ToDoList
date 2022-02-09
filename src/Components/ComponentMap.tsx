import React from 'react';
import s from "../ToDoList.module.css";
import {CheckBox} from "./CheckBox";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";
import {TaskType} from "../App";

type ComponentMapType = {
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID:string, taskId: string) => void
    checkBoxFilter: (todoListID: string, id: string,value: boolean) => void
    changeTaskTitle: (taskID: string, id: string,newTitle: string) => void
}

export const ComponentMap = (props:ComponentMapType) => {

    const{todoListID, tasks, removeTask, checkBoxFilter, changeTaskTitle} = props

    const onChangeStatusHandler = (todoListID: string, tID: string, event: boolean) => {
        checkBoxFilter(todoListID, tID, event)
    }
    const onClickHandlerTask = (tID: string) => removeTask(todoListID, tID)
    const changeTitle = (todoListID: string, tID:string, newTitle:string) => changeTaskTitle(todoListID, tID, newTitle)
    return (
        <ul>
            {
                tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? s.isDoneS : ''}>
                        <CheckBox onChange={(value)=>onChangeStatusHandler(todoListID, t.id, value)} checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={(newTitle)=>changeTitle(todoListID, t.id, newTitle)}/>
                        <Button name={'x'} callBackHandlerForAddTask={()=>onClickHandlerTask(t.id)}/>
                    </li>
                })
            }
        </ul>
    );
};

