import React, {ChangeEvent, KeyboardEvent, useCallback} from 'react'
import {TextField} from "@material-ui/core";
import {RequestStatusType} from "../app/app-reducer";

type InputType = {
    error?:boolean
    id?: string
    label?:string
    helperText?:string
    setError?:(value:boolean) => void
    title:string
    setTitle: (title:string) => void
    callBackHandlerForAddTask: () => void
    disabled?: boolean
}

export const Input = React.memo(({title, setTitle,setError,...props}: InputType) => {
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (setError) {
            setError(false)
        }
    }, [setTitle])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBackHandlerForAddTask();
            setTitle('')
        }
    }, [setTitle])
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
                disabled={props.disabled}
            />
        )
})