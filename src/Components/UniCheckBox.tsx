import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";

type CheckBoxType = {
    checked: boolean
    onChange: (value: boolean) => void
}

export const UniCheckBox = React.memo((props: CheckBoxType) => {

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.checked)
    }, [props.onChange])

    return (
        // <input type='checkbox' checked={props.checked} onChange={onChangeHandler}/>
        <Checkbox checked={props.checked} onChange={onChangeHandler} color={"secondary"}/>

    )
})