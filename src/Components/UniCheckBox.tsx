import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import {TaskStatuses} from "../api/todolist-api";

type CheckBoxType = {
    checked: boolean | TaskStatuses
    onChange: (value: boolean | TaskStatuses ) => void
}

export const UniCheckBox = React.memo(({
                                           checked,
                                           onChange
                                       }: CheckBoxType) => {

    const onRegularChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }, [onChange])

    const onTaskChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }, [onChange])


    return (
        <Checkbox checked={TaskStatuses ? checked == TaskStatuses.Completed : checked as boolean}
                  onChange={TaskStatuses ? onTaskChangeHandler : onRegularChangeHandler} color={"secondary"}/>
    )
})