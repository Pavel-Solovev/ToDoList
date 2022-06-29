import React, {useCallback} from 'react'
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {RequestStatusType} from "../app/app-reducer";

type ButtonType = {
    name: string
    callBackHandler: () => void
    className?: string
    typeButton?: "text" | "contained" | "outlined"
    classButton?: string
    disabled?: boolean
}

export const UniButton = React.memo((props: ButtonType) => {
    const onClickHandler = useCallback(() => {
        props.callBackHandler()
    }, [props.callBackHandler, props.typeButton, props.name])
    if (props.classButton==='delete') {
        return (<>
                <IconButton onClick={onClickHandler} disabled={props.disabled} aria-label="delete" size="small">
                    <Delete fontSize="small" />
                </IconButton>
            </>
        )
    }
    if (props.classButton==='filter') {
        return (<>
                <Button variant={props.typeButton} onClick={onClickHandler} disabled={props.disabled}
                        style={{
                    maxWidth: '100px',
                    maxHeight: '24px',
                    minWidth: '24px',
                    minHeight: '24px'
                }}>{props.name}</Button>
            </>
        )
    } else {
        return (<>
                <Button variant="outlined" onClick={onClickHandler} disabled={props.disabled}
                        style={{
                    maxWidth: '24px',
                    maxHeight: '24px',
                    minWidth: '24px',
                    minHeight: '24px'
                }}>{props.name}</Button>
            </>
        )
    }
})