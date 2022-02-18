import React from 'react'
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type ButtonType = {
    name: string
    callBackHandlerForAddTask: () => void
    // setTitle: (title:string) => void
    className?: string
    typeButton?: "text" | "contained" | "outlined"
    classButton?: string
}

export const UniButton = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBackHandlerForAddTask()
    }
    if (props.classButton==='delete') {
        return (<>
                {/*<button className={props.className} onClick={onClickHandler}>{props.name}</button>*/}
                <IconButton aria-label="delete" size="small">
                    <Delete onClick={onClickHandler} fontSize="small" />
                </IconButton>
            </>
        )
    }
    if (props.classButton==='filter') {
        return (<>
                {/*<button className={props.className} onClick={onClickHandler}>{props.name}</button>*/}
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
                {/*<button className={props.className} onClick={onClickHandler}>{props.name}</button>*/}
                <Button variant="outlined" onClick={onClickHandler} style={{
                    maxWidth: '24px',
                    maxHeight: '24px',
                    minWidth: '24px',
                    minHeight: '24px'
                }}>{props.name}</Button>
            </>
        )
    }
}