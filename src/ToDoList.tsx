import React from 'react';
import {FilterValuesType} from './App';
import {UniButton} from "./Components/UniButton";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {ComponentMap} from "./Components/ComponentMap";

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

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={(newTitle)=>changeTodoListTitle(newTitle)}/>
            <UniButton name={'x'} callBackHandlerForAddTask={onClickHandlerTodo} classButton={'delete'}/>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ComponentMap
            todoListID={props.todoListID}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            checkBoxFilter={props.checkBoxFilter}
            tasks={props.tasks}/>
        <div >
            <UniButton name={'All'} typeButton={props.filter === 'All' ? "contained" : "outlined"} callBackHandlerForAddTask={() => onFilterClickHandler('All')} classButton={'filter'}/>
            <UniButton name={'Active'} typeButton={props.filter === 'Active' ? "contained" : "outlined"} callBackHandlerForAddTask={() => onFilterClickHandler('Active')} classButton={'filter'}/>
            <UniButton name={'Completed'} typeButton={props.filter === 'Completed' ? "contained" : "outlined"} callBackHandlerForAddTask={() => onFilterClickHandler('Completed')} classButton={'filter'}/>
        </div>
    </div>
}
