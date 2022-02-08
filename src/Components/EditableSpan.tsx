import React, {ChangeEvent, FC, useState} from 'react'


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
        // setError(false)
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
        ? <input
            autoFocus={true}
            value={userText}
            onChange={onChangeHandler}
            onBlur={offEditMode}/>
        : <span onDoubleClick={onEditMode}>{title}</span>

}
