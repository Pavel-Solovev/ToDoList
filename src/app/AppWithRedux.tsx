import React, {useCallback, useEffect} from 'react';
import '../trash/App.css';
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import {ButtonAppBar} from "../Components/AppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddTodolistThunkC, fetchTodolistThunkC, TodolistDomainType} from "../features/TodolistList/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {Todolist1} from "../features/TodolistList/ToDoList1";
import {TaskStateType} from "../features/TodolistList/task-reducer";

export function AppWithRedux() {
    useEffect(()=>{
        dispatch(fetchTodolistThunkC())
    }, [])

    const todoList = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistThunkC(title))
    }, [dispatch])

    return (
        <div>
            <ButtonAppBar/>
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
            </Container>
        </div>
    );

}

