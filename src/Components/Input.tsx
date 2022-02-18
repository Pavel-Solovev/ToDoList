import React, {ChangeEvent, KeyboardEvent} from 'react'
import {TextField} from "@material-ui/core";

type InputType = {
    error?:boolean
    id?: string
    label?:string
    helperText?:string
    setError?:(value:boolean) => void
    title:string
    setTitle: (title:string) => void
    callBackHandlerForAddTask: () => void
}

export const Input = ({title, setTitle,setError,...props}: InputType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (setError) {
            setError(false)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
     if (e.key === 'Enter') {
         props.callBackHandlerForAddTask();
         setTitle('')
        }
     }
        return (
            <TextField
                error={props.error}
                id={props.id}
                label={props.label}
                helperText={props.helperText}
                value={title}
                variant="standard"
                onChange={ onChangeHandler }
                onKeyPress={ onKeyPressHandler }
            />
        )

}