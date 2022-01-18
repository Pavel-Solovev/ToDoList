import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
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
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')

    let setChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        let titleClean = title.trim()
        if (titleClean !== '') {
        props.addTask(titleClean.trim())
        setTitle('')
    }}
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }
    const onFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }
    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={setChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {removeTaskHandler(t.id)}}>x</button>
                    </li>
                )
            })
            }
        </ul>
        <div>
            <button onClick={() => onFilterHandler("all")}>All</button>
            <button onClick={() => onFilterHandler("active")}>Active</button>
            <button onClick={() => onFilterHandler("completed")}>Completed</button>
        </div>
    </div>
}

