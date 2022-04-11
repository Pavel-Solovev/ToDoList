import React from 'react';
import {FilterValuesType} from './App';
import {UniButton} from "./Components/UniButton";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {ComponentMap} from "./Components/ComponentMap";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStateType, TodoListType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, RemoveTodoListAC} from "./state/reducers/todolists-reducer";
import {addTaskAC} from "./state/reducers/task-reducer";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListType
    tasks:TaskStateType
}

export function Todolist1(props: PropsType) {

    // const todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(todo => todo.id)[0])
    // const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolist.id])


    const dispatch = useDispatch()

    const onFilterClickHandler = (value: FilterValuesType) => dispatch(changeTodolistFilterAC(props.todolist.id, value));

    const onClickHandlerTodo = () => dispatch(RemoveTodoListAC(props.todolist.id))
    const addTask = (title:string) => dispatch(addTaskAC(props.todolist.id, title))
    const changeTodoListTitle = (newTitle:string) => dispatch(changeTodolistTitleAC(props.todolist.id, newTitle))

    return <div>
        <h3>
            <EditableSpan title={props.todolist.title} changeTitle={(newTitle)=>changeTodoListTitle(newTitle)}/>
            <UniButton name={'x'} callBackHandlerForAddTask={onClickHandlerTodo} classButton={'delete'}/>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ComponentMap
            todolist={props.todolist}
            tasks={props.tasks}
         />
        <div >
            <UniButton name={'All'} typeButton={props.todolist.filter === 'All' ? "contained" : "outlined"} callBackHandlerForAddTask={() => onFilterClickHandler('All')} classButton={'filter'}/>
            <UniButton name={'Active'} typeButton={props.todolist.filter === 'Active' ? "contained" : "outlined"} callBackHandlerForAddTask={() => onFilterClickHandler('Active')} classButton={'filter'}/>
            <UniButton name={'Completed'} typeButton={props.todolist.filter === 'Completed' ? "contained" : "outlined"} callBackHandlerForAddTask={() => onFilterClickHandler('Completed')} classButton={'filter'}/>
        </div>
    </div>
}
