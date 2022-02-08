import React from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from "./Components/CheckBox";
import s from './ToDoList.module.css'
import {Button} from "./Components/Button";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";

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

    const onFilterClickHandler = (todoListID: string, value: FilterValuesType) => props.changeFilter(todoListID, value);
    const onChangeStatusHandler = (todoListID: string, tID: string, event: boolean) => {
        props.checkBoxFilter(todoListID, tID, event)
    }
    const onClickHandlerTask = (tID: string) => props.removeTask(props.todoListID, tID)
    const onClickHandlerTodo = () => props.removeTodoList(props.todoListID)
    const addTask = (title:string) => props.addTask(props.todoListID, title)

    const changeTaskTitle = (todoListID: string, tID:string, newTitle:string) => props.changeTaskTitle(props.todoListID, tID, newTitle)
    const changeTodoListTitle = (todoListID: string, newTitle:string) => props.changeTodoListTitle(props.todoListID, newTitle)

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={(newTitle)=>changeTodoListTitle(props.todoListID, newTitle)}/>
            <Button name={'x'} callBackHandlerForAddTask={onClickHandlerTodo}/>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? s.isDoneS : ''}>
                        <CheckBox onChange={(value)=>onChangeStatusHandler(props.todoListID, t.id, value)} checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={(newTitle)=>changeTaskTitle(props.todoListID, t.id, newTitle)}/>
                        <Button name={'x'} callBackHandlerForAddTask={()=>onClickHandlerTask(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div >
            <Button name={'All'} className={props.filter === 'All' ? s.activeFilter : ''} callBackHandlerForAddTask={() => onFilterClickHandler(props.todoListID, 'All')}/>
            <Button name={'Active'} className={props.filter === 'Active' ? s.activeFilter : ''} callBackHandlerForAddTask={() => onFilterClickHandler(props.todoListID,'Active')}/>
            <Button name={'Completed'} className={props.filter === 'Completed' ? s.activeFilter : ''} callBackHandlerForAddTask={() => onFilterClickHandler(props.todoListID,'Completed')}/>
        </div>
    </div>
}
