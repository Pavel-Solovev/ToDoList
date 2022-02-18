import React, {ChangeEvent, FC, useState} from 'react'
import {TextField} from "@material-ui/core";


type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (
    {
        title,
        changeTitle
    }
) => {
    const [userText, setUserText] = useState<string>("")
    const [editMode, setEditMode] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUserText(e.currentTarget.value)
    }


    const onEditMode = () => {
        setEditMode(true)
        setUserText(title)
    }
    const offEditMode = () => {

        setEditMode(false)
        changeTitle(userText)
    }


    return editMode
        ? <TextField
            id={"standard-error-helper-text"}
            style={{maxWidth: '120px'}}
            value={userText}
            variant="standard"
            autoFocus={true}
            onChange={ onChangeHandler }
            onBlur={offEditMode}
        />
        : <span onDoubleClick={onEditMode}>{title}</span>

}
