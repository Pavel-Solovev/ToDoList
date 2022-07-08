import React, {useEffect} from 'react';
import '../trash/App.css';
import {ButtonAppBar} from "../Components/AppBar";
import {Container} from "@material-ui/core";
import {Route, Routes, Navigate} from 'react-router-dom';
import {fetchTodolistThunkC, TodolistDomainType} from "../features/TodolistList/todolists-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./store";
import {TaskStateType} from "../features/TodolistList/task-reducer";
import {LinearProgress} from "@mui/material";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/login";
import {TodolistList} from "../features/TodolistList/TodolistList";

export function AppWithRedux() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoginIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const todoList = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)


    return (
        <div>

            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>

                <Routes>
                    <Route path='/' element={<TodolistList todolist={todoList} tasks={tasks} isLoginIn={isLoginIn}/>}/>
                    <Route path='Login' element={<Login/>}/>
                    <Route path='404' element={<main style={{ padding: '1rem'}}>
                        <p>There's nothing here!</p>
                    </main>}/>
                    <Route path='*' element={<Navigate to={'404'}/>}/>
                </Routes>
                <ErrorSnackbar/>

            </Container>

        </div>
    );

}

