import React, {ChangeEvent} from "react";

type CheckBoxType = {
    checked:boolean
    onChange:(value: boolean) => void
}

export const CheckBox=(props:CheckBoxType) =>
{

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.checked)
    }

    return(
        <input type='checkbox' checked={props.checked} onChange={onChangeHandler}/>
    )
}