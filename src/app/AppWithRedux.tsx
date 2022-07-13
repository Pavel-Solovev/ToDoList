import React, {useEffect} from 'react';
import '../trash/App.css';
import {ButtonAppBar} from "../Components/AppBar";
import {Container} from "@material-ui/core";
import {Route, Routes, Navigate} from 'react-router-dom';
import {TodolistDomainType} from "../features/TodolistList/todolists-reducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./store";
import {TaskStateType} from "../features/TodolistList/task-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/login";
import {TodolistList} from "../features/TodolistList/TodolistList";

export function AppWithRedux() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const todoList = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)
    const isInitialised = useAppSelector<boolean>(state => state.app.isInitialised)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(initializeAppTC)
    }, [])

    if (!isInitialised) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div>

            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>

                <Routes>
                    <Route path='/' element={<TodolistList todolist={todoList} tasks={tasks}/>}/>
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

