import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from "./Components/CheckBox";
import s from './ToDoList.module.css'
import {Input} from "./Components/Input";
import {Button} from "./Components/Button";

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
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addTask = () => {
        if (title.trim() !== '') {
        props.addTask(props.todoListID, title.trim());
        setTitle("");}
        else{setError(true)}
    }
    const onFilterClickHandler = (todoListID: string, value: FilterValuesType) => props.changeFilter(todoListID, value);
    const onChangeStatusHandler = (todoListID: string, tID: string, event: boolean) => {
        props.checkBoxFilter(todoListID, tID, event)
    }
    const onClickHandlerTask = (tID: string) => props.removeTask(props.todoListID, tID)
    const onClickHandlerTodo = () => props.removeTodoList(props.todoListID)

    return <div>
        <h3>
            {props.title}
            <Button name={'x'} callBackHandlerForAddTask={onClickHandlerTodo}/>
        </h3>
        <div>
            <Input title={title} setTitle={setTitle} callBackHandlerForAddTask={addTask}/>
            <Button name={'+'} callBackHandlerForAddTask={addTask}/>
            {error && <div className={s.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? s.isDoneS : ''}>
                        <CheckBox onChange={(value)=>onChangeStatusHandler(props.todoListID, t.id, value)} checked={t.isDone}/>
                        <span>{t.title}</span>
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
