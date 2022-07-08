import React, {useCallback, useEffect} from 'react';
import {UniButton} from "../../Components/UniButton";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../Components/EditableSpan";
import {ComponentMapForToDo1} from "./CompMapForToDo1/ComponentMapForToDo1";
import {useDispatch} from "react-redux";
import {
    changeTodolistFilterAC,
    changeTodolistTitleThunkC, FilterValuesType,
    RemoveTodoListThunkC, TodolistDomainType
} from "./todolists-reducer";
import {addTaskThunkC, fetchTaskThunkC, TaskStateType} from "./task-reducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskStateType
}

export const Todolist1 = React.memo((props: PropsType) => {
    let tasksForTodolist = props.tasks[props.todolist.id];
    if (props.todolist.filter === "Active") {
        tasksForTodolist = tasksForTodolist.filter(tl => !tl.status);
    }
    if (props.todolist.filter === "Completed") {
        tasksForTodolist = tasksForTodolist.filter(tl => tl.status);
    }

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchTaskThunkC(props.todolist.id))
    },[])

    const onFilterClickHandler = useCallback((todolistId: string, value: FilterValuesType) =>
        dispatch(changeTodolistFilterAC(todolistId, value)), [dispatch]);

    const onClickHandlerTodo = useCallback((todolistId: string) =>
        dispatch(RemoveTodoListThunkC(todolistId)), [dispatch])
    const addTask = useCallback((title: string) =>
        dispatch(addTaskThunkC(props.todolist.id, title)), [dispatch,props.todolist.id])
    const changeTodoListTitle = useCallback((todolistId: string, newTitle: string) =>
        dispatch(changeTodolistTitleThunkC(todolistId, newTitle)), [dispatch])

    return <div>
        <h3>
            <EditableSpan title={props.todolist.title}
                          changeTitle={(newTitle) => changeTodoListTitle(props.todolist.id, newTitle)}/>
            <UniButton name={'x'} callBackHandler={() => onClickHandlerTodo(props.todolist.id)}
                       disabled={props.todolist.entityStatus === 'loading'} classButton={'delete'}/>
        </h3>
        <div>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus ==='loading'}/>
        </div>
        <ComponentMapForToDo1
            todolist={props.todolist}
            tasks={tasksForTodolist}
        />
        <div>
            <UniButton name={'All'} typeButton={props.todolist.filter === 'All' ? "contained" : "outlined"}
                       callBackHandler={() => onFilterClickHandler(props.todolist.id, 'All')} classButton={'filter'}/>
            <UniButton name={'Active'} typeButton={props.todolist.filter === 'Active' ? "contained" : "outlined"}
                       callBackHandler={() => onFilterClickHandler(props.todolist.id, 'Active')} classButton={'filter'}/>
            <UniButton name={'Completed'} typeButton={props.todolist.filter === 'Completed' ? "contained" : "outlined"}
                       callBackHandler={() => onFilterClickHandler(props.todolist.id, 'Completed')} classButton={'filter'}/>
        </div>
    </div>
})
