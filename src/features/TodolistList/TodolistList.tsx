import React, {useCallback, useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Paper} from "@mui/material";
import {Todolist1} from "./ToDoList1";
import {useDispatch} from "react-redux";
import {AddTodolistThunkC, fetchTodolistThunkC, TodolistDomainType} from "./todolists-reducer";
import {TaskStateType} from "./task-reducer";
import {Navigate} from "react-router-dom";

type PropsType = {
    todolist: TodolistDomainType[]
    tasks: TaskStateType
    isLoginIn: boolean
}



export const TodolistList = (props: PropsType) => {
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistThunkC(title))
    }, [dispatch])

    useEffect(() => {
        if (props.isLoginIn)
            dispatch(fetchTodolistThunkC())
    }, [])

    if (!props.isLoginIn) {
        return <Navigate to={'Login'}/>
    }
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {props.todolist.map((tl, index) => {
                    return <Grid item key={index}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist1
                                key={index}
                                todolist={tl}
                                tasks={props.tasks}
                            />
                        </Paper>
                    </Grid>
                })
                }
            </Grid>
        </>
    );
};

