import React, {ChangeEvent, FC, useCallback, useState} from 'react'
import {TextField} from "@material-ui/core";


type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanType> = React.memo((
    {
        title,
        changeTitle
    }
) => {
    const [userText, setUserText] = useState<string>("")
    const [editMode, setEditMode] = useState<boolean>(false)
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserText(e.currentTarget.value)
    },[title, changeTitle])


    const onEditMode = useCallback(() => {
        setEditMode(true)
        setUserText(title)
    }, [title])
    const offEditMode = useCallback(() => {

        setEditMode(false)
        changeTitle(userText)
    }, [changeTitle, userText])


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

})
