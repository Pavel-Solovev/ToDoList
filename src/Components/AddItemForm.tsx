import React, {useState} from "react";
import {Input} from "./Input";
import {Button} from "./Button";
import s from "../ToDoList.module.css";

type AddItemFormType = {
    addItem: any
}

export const AddItemForm: React.FC<AddItemFormType> = (props) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addItem = () => {
        setError(false)
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError(true)
        }}

        return (<div>

                <Input title={title} setTitle={setTitle} callBackHandlerForAddTask={addItem}/>
                <Button name={'+'} callBackHandlerForAddTask={addItem}/>
                {error && <div className={s.errorMessage}>Title is required</div>
                }</div>
        )

}
