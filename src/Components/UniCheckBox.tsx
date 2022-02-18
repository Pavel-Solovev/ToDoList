import React, {ChangeEvent} from "react";
import {Checkbox} from "@material-ui/core";

type CheckBoxType = {
    checked: boolean
    onChange: (value: boolean) => void
}

export const UniCheckBox = (props: CheckBoxType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.checked)
    }

    return (
        // <input type='checkbox' checked={props.checked} onChange={onChangeHandler}/>
        <Checkbox checked={props.checked} onChange={onChangeHandler} color={"secondary"}/>

    )
}