import React, {useCallback, useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {CircularProgress, Paper} from "@mui/material";
import {Todolist1} from "./ToDoList1";
import {useDispatch} from "react-redux";
import {AddTodolistThunkC, fetchTodolistThunkC, TodolistDomainType} from "./todolists-reducer";
import {TaskStateType} from "./task-reducer";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../app/store";

type PropsType = {
    todolist: TodolistDomainType[]
    tasks: TaskStateType
}



export const TodolistList = (props: PropsType) => {
    const isLoginIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistThunkC(title))
    }, [dispatch])

    useEffect(() => {
        debugger
        if (isLoginIn) {
            dispatch(fetchTodolistThunkC())
        } else {
            navigate('Login')
        }

    }, [isLoginIn])

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
                                isLoginIn={isLoginIn}
                            />
                        </Paper>
                    </Grid>
                })
                }
            </Grid>
        </>
    );
};

