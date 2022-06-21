import React, {useCallback, useEffect} from 'react';
import '../trash/App.css';
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "../Components/AppBar";
import {Container, Grid} from "@material-ui/core";
import {AddTodolistThunkC, fetchTodolistThunkC, TodolistDomainType} from "../features/TodolistList/todolists-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./store";
import {Todolist1} from "../features/TodolistList/ToDoList1";
import {TaskStateType} from "../features/TodolistList/task-reducer";
import {LinearProgress, Paper} from "@mui/material";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";

export function AppWithRedux() {
    useEffect(()=>{
        dispatch(fetchTodolistThunkC())
    }, [])

    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const todoList = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistThunkC(title))
    }, [dispatch])

    return (
        <div>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color={'secondary'} />}
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoList.map((tl, index) => {
                        return <Grid item key={index}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist1
                                    key={index}
                                    todolist={tl}
                                    tasks={tasks}
                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
                <ErrorSnackbar/>
            </Container>
        </div>
    );

}

