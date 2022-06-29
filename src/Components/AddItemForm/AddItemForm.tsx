import React, {useCallback, useState} from "react";
import {Input} from "../Input";
import {UniButton} from "../UniButton";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormType> = React.memo((props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            if (title !== '')setTitle("");
            if (error) setError(false)
        } else {
            if (!error) setError(true)
        }
    }
        return (<div>
                <Input
                    error={error}
                    id={"standard-error-helper-text"}
                    label={error ? 'Error' : 'Required'}
                    helperText={error ? 'Title is required' : 'Input title'}
                    title={title}
                    setError={setError}
                    setTitle={setTitle}
                    callBackHandlerForAddTask={addItem}
                    disabled={props.disabled}
                />
                <UniButton name={'+'} callBackHandler={addItem} disabled={props.disabled}/>
                </div>
        )
})
