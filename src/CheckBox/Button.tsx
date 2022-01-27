import React from 'react'

type ButtonType = {
    name:string
    callBackHandlerForAddTask: () => void
    setTitle: (title:string) => void
}

export const Button = (props:ButtonType) => {
    const onClickHandler = ()=>{
        props.callBackHandlerForAddTask()
        props.setTitle('')
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}