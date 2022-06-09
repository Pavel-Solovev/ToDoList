import React, {useCallback} from 'react';
import s from "../ToDoList.module.css";
import {UniCheckBox} from "../../../Components/UniCheckBox";
import {EditableSpan} from "../../../Components/EditableSpan";
import {UniButton} from "../../../Components/UniButton";

import {useDispatch} from "react-redux";
import {
 changeTaskStatusThunkC,
    changeTaskThunkC,
    removeTaskThunkC
} from "../task-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {TodolistDomainType} from "../todolists-reducer";

type ComponentMapType = {
    todolist: TodolistDomainType
    tasks:TaskType[]
}

export const ComponentMapForToDo1 = React.memo((props: ComponentMapType) => {
    const dispatch = useDispatch()
    const onChangeStatusHandler = useCallback((todoListID: string, tID: string, event: TaskStatuses) => {
        dispatch(changeTaskStatusThunkC(todoListID, tID, event))
    }, [dispatch])
    const onClickHandlerTask = useCallback((tID: string) =>
        dispatch(removeTaskThunkC(props.todolist.id, tID)), [dispatch])
    const changeTitle = useCallback((todoListID: string, tID: string, newTitle: string) =>
        dispatch(changeTaskThunkC(todoListID, tID, newTitle)), [dispatch])
    return (
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.status == 2 ? s.isDoneS : ''}>
                        <UniCheckBox onChange={(event) => onChangeStatusHandler(props.todolist.id, t.id, event as TaskStatuses)}
                                     checked={t.status}/>
                        <EditableSpan title={t.title}
                                      changeTitle={(newTitle) => changeTitle(props.todolist.id, t.id, newTitle)}/>
                        <UniButton name={'x'} callBackHandler={() => onClickHandlerTask(t.id)}
                                   classButton={'delete'}/>
                    </li>
                })
            }
        </ul>
    );
});

