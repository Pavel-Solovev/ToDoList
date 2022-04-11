import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './ToDoList';
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {ButtonAppBar} from "./Components/AppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    AddTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./state/reducers/todolists-reducer";
import {addTaskAC, changeDoneAC, changeTitleTaskAC, removeTaskAC, taskReducer} from "./state/reducers/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist1} from "./ToDoList1";

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

    const todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType> (state => state.tasks)

    const dispatch = useDispatch()

    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        dispatch(AddTodolistAC(newTodoListID, title))
    }

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
                        </Paper>
                    </Grid>
                })
                }
                </Grid>
            </Container>
        </div>
    );

}

