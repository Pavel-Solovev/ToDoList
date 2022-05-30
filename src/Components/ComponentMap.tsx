import React, {useCallback} from 'react';
import s from "../ToDoList.module.css";
import {UniCheckBox} from "./UniCheckBox";
import {EditableSpan} from "./EditableSpan";
import {UniButton} from "./UniButton";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {FilterValuesType, TaskStateType, TodoListType} from "../AppWithRedux";
import {
    changeDoneAC,
    changeTaskThunkC,
    changeTitleTaskAC,
    removeTaskAC,
    removeTaskThunkC
} from "../state/reducers/task-reducer";
import {TaskType} from "../api/todolist-api";

type ComponentMapType = {
    todolist: TodoListType
    tasks:TaskType[]
}

export const ComponentMap = React.memo((props: ComponentMapType) => {

    // const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolist.id])

    const dispatch = useDispatch()

    // const{todoListID, tasks, removeTask, checkBoxFilter, changeTaskTitle} = props

    const onChangeStatusHandler = useCallback((todoListID: string, tID: string, event: boolean) => {
        dispatch(changeDoneAC(todoListID, tID, event))
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
                        <UniCheckBox onChange={(event) => onChangeStatusHandler(props.todolist.id, t.id, event)}
                                     checked={t.status}/>
                        <EditableSpan title={t.title}
                                      changeTitle={(newTitle) => changeTitle(props.todolist.id, t.id, newTitle)}/>
                        <UniButton name={'x'} callBackHandlerForAddTask={() => onClickHandlerTask(t.id)}
                                   classButton={'delete'}/>
                    </li>
                })
            }
        </ul>
    );
});

