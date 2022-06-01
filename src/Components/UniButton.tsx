import React, {useCallback} from 'react'
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type ButtonType = {
    name: string
    callBackHandlerForAddTask: () => void
    className?: string
    typeButton?: "text" | "contained" | "outlined"
    classButton?: string
}

export const UniButton = React.memo((props: ButtonType) => {
    const onClickHandler = useCallback(() => {
        props.callBackHandlerForAddTask()
    }, [props.callBackHandlerForAddTask, props.typeButton, props.name])
    if (props.classButton==='delete') {
        return (<>
                <IconButton onClick={onClickHandler} aria-label="delete" size="small">
                    <Delete fontSize="small" />
                </IconButton>
            </>
        )
    }
    if (props.classButton==='filter') {
        return (<>
                <Button variant={props.typeButton} onClick={onClickHandler} style={{
                    maxWidth: '100px',
                    maxHeight: '24px',
                    minWidth: '24px',
                    minHeight: '24px'
                }}>{props.name}</Button>
            </>
        )
    } else {
        return (<>
                <Button variant="outlined" onClick={onClickHandler} style={{
                    maxWidth: '24px',
                    maxHeight: '24px',
                    minWidth: '24px',
                    minHeight: '24px'
                }}>{props.name}</Button>
            </>
        )
    }
})