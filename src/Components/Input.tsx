import React, {ChangeEvent, KeyboardEvent, useCallback} from 'react'
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

export const Input = React.memo(({title, setTitle,setError,...props}: InputType) => {
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (setError) {
            setError(false)
        }
    }, [setTitle, setError, title])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBackHandlerForAddTask();
            setTitle('')
        }
    }, [setTitle, title])
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
})