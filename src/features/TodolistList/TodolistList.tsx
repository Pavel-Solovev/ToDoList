import React, {useCallback} from 'react';
import {Grid} from "@material-ui/core";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Paper} from "@mui/material";
import {Todolist1} from "./ToDoList1";
import {useDispatch} from "react-redux";
import {AddTodolistThunkC, TodolistDomainType} from "./todolists-reducer";
import {TaskStateType} from "./task-reducer";

type PropsType = {
    todolist: TodolistDomainType[]
    tasks: TaskStateType
}

export const TodolistList = (props: PropsType) => {
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistThunkC(title))
    }, [dispatch])

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

