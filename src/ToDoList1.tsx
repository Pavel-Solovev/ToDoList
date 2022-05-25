import React, {useCallback} from 'react';
import {UniButton} from "./Components/UniButton";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {ComponentMap} from "./Components/ComponentMap";
import {useDispatch} from "react-redux";
import {FilterValuesType, TaskStateType, TodoListType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, RemoveTodoListAC} from "./state/reducers/todolists-reducer";
import {addTaskAC} from "./state/reducers/task-reducer";

type PropsType = {
    todolist: TodoListType
    tasks: TaskStateType
}

export const Todolist1 = React.memo((props: PropsType) => {
    console.log('Todolist')
    // const todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(todo => todo.id)[0])
    // const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolist.id])
    debugger
    let tasksForTodolist = props.tasks[props.todolist.id];
    if (props.todolist.filter === "Active") {
        tasksForTodolist = tasksForTodolist.filter(tl => !tl.isDone);
    }
    if (props.todolist.filter === "Completed") {
        tasksForTodolist = tasksForTodolist.filter(tl => tl.isDone);
    }

    const dispatch = useDispatch()

    const onFilterClickHandler = useCallback((value: FilterValuesType) => dispatch(changeTodolistFilterAC(props.todolist.id, value)), [dispatch]);

    const onClickHandlerTodo = useCallback(() => dispatch(RemoveTodoListAC(props.todolist.id)), [dispatch])
    const addTask = useCallback((title: string) => dispatch(addTaskAC(props.todolist.id, title)), [dispatch])
    const changeTodoListTitle = useCallback((newTitle: string) => dispatch(changeTodolistTitleAC(props.todolist.id, newTitle)), [dispatch])

    return <div>
        <h3>
            <EditableSpan title={props.todolist.title} changeTitle={(newTitle) => changeTodoListTitle(newTitle)}/>
            <UniButton name={'x'} callBackHandlerForAddTask={onClickHandlerTodo} classButton={'delete'}/>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <ComponentMap
            todolist={props.todolist}
            tasks={tasksForTodolist}
        />
        <div>
            <UniButton name={'All'} typeButton={props.todolist.filter === 'All' ? "contained" : "outlined"}
                       callBackHandlerForAddTask={() => onFilterClickHandler('All')} classButton={'filter'}/>
            <UniButton name={'Active'} typeButton={props.todolist.filter === 'Active' ? "contained" : "outlined"}
                       callBackHandlerForAddTask={() => onFilterClickHandler('Active')} classButton={'filter'}/>
            <UniButton name={'Completed'} typeButton={props.todolist.filter === 'Completed' ? "contained" : "outlined"}
                       callBackHandlerForAddTask={() => onFilterClickHandler('Completed')} classButton={'filter'}/>
        </div>
    </div>
})
