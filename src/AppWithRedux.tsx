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
import {TodolistApi} from "./api/todolist-api";

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

export function AppWithRedux() {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodos()
            .then((response) => {
                setState(response.data);
            })
    }, [])

    useEffect(() => {
        const title = '1234'
        TodolistApi.createTodos(title)
            .then((response) => {
                setState(response.data.data.item.addedDate)
            })
    }, [])

    useEffect(() => {
        const todolistId = 'e2af2177-f307-4f64-9153-a16245acaee6'
        TodolistApi.deleteTodos(todolistId)
            .then((response) => {
                setState(response.data);
            })
    }, [])
    useEffect(() => {
        const todolistId = '26257d02-984e-4953-8ccc-6776a14229f0'
        const title = '4321'
        TodolistApi.updateTitleTodos(todolistId, title)
            .then((response) => {
                setState(response.data);
            })
    }, [])


    const todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

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
                            <Paper style={{padding: '10px'}}>
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

