import React from 'react';
import {UniButton} from "../Components/UniButton";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {EditableSpan} from "../Components/EditableSpan";
import {ComponentMapForToDo1} from "../features/TodolistList/CompMapForToDo1/ComponentMapForToDo1";
import {FilterValuesType} from "../features/TodolistList/todolists-reducer";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID:string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    checkBoxFilter: (todoListID: string, id: string,value: boolean) => void
    removeTodoList: (todoListID: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskID: string, id: string,newTitle: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onFilterClickHandler = (value: FilterValuesType) => props.changeFilter(props.todoListID, value);
    const onClickHandlerTodo = () => props.removeTodoList(props.todoListID)
    const addTask = (title:string) => props.addTask(props.todoListID, title)
    const changeTodoListTitle = (newTitle:string) => props.changeTodoListTitle(props.todoListID, newTitle)

    // @ts-ignore

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={(newTitle)=>changeTodoListTitle(newTitle)}/>
            <UniButton name={'x'} callBackHandler={onClickHandlerTodo} classButton={'delete'}/>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ComponentMapForToDo1
            // @ts-ignore
            todoListID={props.todoListID}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            checkBoxFilter={props.checkBoxFilter}
            // @ts-ignore
            tasks={props.tasks}/>
        <div >
            <UniButton name={'All'} typeButton={props.filter === 'All' ? "contained" : "outlined"} callBackHandler={() => onFilterClickHandler('All')} classButton={'filter'}/>
            <UniButton name={'Active'} typeButton={props.filter === 'Active' ? "contained" : "outlined"} callBackHandler={() => onFilterClickHandler('Active')} classButton={'filter'}/>
            <UniButton name={'Completed'} typeButton={props.filter === 'Completed' ? "contained" : "outlined"} callBackHandler={() => onFilterClickHandler('Completed')} classButton={'filter'}/>
        </div>
    </div>
}
