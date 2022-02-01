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
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    checkBoxFilter: (id: string,value: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addTask = () => {
        if (title.trim() !== '') {
        props.addTask(title.trim());
        setTitle("");}
        else{setError(true)}
    }


    const onFilterClickHandler = (value: FilterValuesType) => props.changeFilter(value);

    const onChangeStatusHandler = (tID: string, event: boolean) => {
        props.checkBoxFilter(tID, event)
    }

    // const callBackHandlerForAddTask = () => {
    //     addTask()
    //     // props.addTask(title)
    //     // setTitle('')
    //}



    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input title={title} setTitle={setTitle} callBackHandlerForAddTask={addTask}/>
            <Button name={'+'} setTitle={setTitle} callBackHandlerForAddTask={addTask}/>
            {error && <div className={s.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id} className={t.isDone ? s.isDoneS : ''}>
                        <CheckBox onChange={(value)=>onChangeStatusHandler(t.id, value)} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name={'x'} callBackHandlerForAddTask={onClickHandler} setTitle={setTitle}/>
                    </li>
                })
            }
        </ul>
        <div >
            <button className={props.filter==='all' ? s.activeFilter : ''} onClick={ () => onFilterClickHandler('all') }>All</button>
            <button className={props.filter==='active' ? s.activeFilter : ''} onClick={ () => onFilterClickHandler('active') }>Active</button>
            <button className={props.filter==='completed' ? s.activeFilter : ''} onClick={ () => onFilterClickHandler('completed') }>Completed</button>
        </div>
    </div>
}
