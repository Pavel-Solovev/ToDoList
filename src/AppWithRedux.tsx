import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {ButtonAppBar} from "./Components/AppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddTodolistAC} from "./state/reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist1} from "./ToDoList1";
import axios from "axios";

export default {
    title:'API'
}

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const setting = {
    withCredentials: true
}

export function AppWithRedux() {
    const [state, setState] = useState<any>(null)
    useEffect(()=> {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', setting)
            .then((response) => {
                debugger
                setState(response.data);

            })
    }, [])


    const todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType> (state => state.tasks)

    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        const newTodoListID = v1()
        dispatch(AddTodolistAC(newTodoListID, title))
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
                    // let tasksForTodolist = tasks[tl.id];
                    // if (tl.filter === "Active") {
                    //     tasksForTodolist = tasks[tl.id].filter(tl => !tl.isDone);
                    // }
                    // if (tl.filter === "Completed") {
                    //     tasksForTodolist = tasks[tl.id].filter(tl => tl.isDone);
                    // }
                    return <Grid item key={index}>
                        <Paper style={{padding:'10px'}}>
                        <Todolist1
                            key={index}
                            todolist={tl}
                            tasks={tasks}

                        />
                            <div>{JSON.stringify(state)}</div>


                        </Paper>
                    </Grid>
                })
                }
                </Grid>
            </Container>
        </div>
    );

}

