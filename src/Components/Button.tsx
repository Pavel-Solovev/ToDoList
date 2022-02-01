import React from 'react'

type ButtonType = {
    name:string
    callBackHandlerForAddTask: () => void
    setTitle: (title:string) => void
    className?: any
}

export const Button = (props:ButtonType) => {
    const onClickHandler = ()=>{
        props.callBackHandlerForAddTask()
        props.setTitle('')
    }
    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    )
}