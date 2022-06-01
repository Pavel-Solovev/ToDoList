// import React, {useReducer} from 'react';
import './App.css';
// import {Todolist} from './ToDoList';
// import {v1} from 'uuid';
// import {AddItemForm} from "./Components/AddItemForm";
// import {ButtonAppBar} from "./Components/AppBar";
// import {Container, Grid, Paper} from "@material-ui/core";
// import {
//     AddTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     RemoveTodoListAC,
//     todolistsReducer
// } from "./state/reducers/todolists-reducer";
// import {addTaskAC, changeDoneAC, changeTitleTaskAC, removeTaskAC, taskReducer} from "./state/reducers/task-reducer";
//
// export type FilterValuesType = "All" | "Active" | "Completed";
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
// export type TaskStateType = {
//     [key: string]: Array<TaskType>
// }
//
// export function AppWithReducers() {
//
//
//     const todoListID_1 = v1()
//     const todoListID_2 = v1()
//     const todoListID_3 = v1()
//
//
//     const [todoList, dispatchTodolists] = useReducer(todolistsReducer,[
//         {id: todoListID_1, title: 'What to learn', filter: 'All'},
//         {id: todoListID_2, title: 'What to buy', filter: 'All'},
//         {id: todoListID_3, title: 'What to read', filter: 'All'},
//     ])
//     const [tasks, dispatchTasks] = useReducer(taskReducer,{
//         [todoListID_1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true}, //"completed"
//             {id: v1(), title: "JS/ES6", isDone: true}, // "completed"
//             {id: v1(), title: "REACT", isDone: true}, // "completed"
//         ],
//         [todoListID_2]: [
//             {id: v1(), title: "Sidr", isDone: false}, //"completed"
//             {id: v1(), title: "Meat", isDone: false}, // "completed"
//             {id: v1(), title: "Milk", isDone: false}, // "completed"
//         ],
//         [todoListID_3]: [
//             {id: v1(), title: "Book 1", isDone: true}, //"completed"
//             {id: v1(), title: "Book 2", isDone: false}, // "completed"
//             {id: v1(), title: "Book 3", isDone: true}, // "completed"
//         ],
//     })
//
//     function removeTask(todoListID: string, id: string) {
//         let action = removeTaskAC(todoListID, id)
//         dispatchTasks(action)
//     }
//
//     function addTask(todoListID: string, title: string) {
//         dispatchTasks(addTaskAC(todoListID, title))
//
//     }
//
//     let checkBoxFilter = (todoListID: string, id: string, isDone: boolean) => {
//         dispatchTasks(changeDoneAC(todoListID, id, isDone))
//     }
//     let changeTaskTitle = (todoListID: string, id: string, title: string) => {
//         dispatchTasks(changeTitleTaskAC(todoListID, id, title))
//     }
//
//     function changeTodoListTitle(todoListID: string, newTitle: string) {
//         dispatchTodolists(changeTodolistTitleAC(todoListID, newTitle))
//     }
//
//     function changeFilter(todoListID: string, value: FilterValuesType) {
//         dispatchTodolists(changeTodolistFilterAC(todoListID, value))
//     }
//
//     const removeTodoList = (id: string) => {
//         dispatchTodolists(RemoveTodoListAC(id))
//         dispatchTasks(RemoveTodoListAC(id))
//     }
//     const addTodoList = (title: string) => {
//         const newTodoListID = v1()
//         dispatchTodolists(AddTodolistAC(newTodoListID, title))
//         dispatchTasks(AddTodolistAC(newTodoListID, title))
//     }
//
//     return (
//         <div>
//             <ButtonAppBar/>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                 {todoList.map((tl, index) => {
//                     let tasksForTodolist = tasks[tl.id];
//                     if (tl.filter === "Active") {
//                         tasksForTodolist = tasks[tl.id].filter(tl => !tl.isDone);
//                     }
//                     if (tl.filter === "Completed") {
//                         tasksForTodolist = tasks[tl.id].filter(tl => tl.isDone);
//                     }
//                     return <Grid item>
//                         <Paper style={{padding:'10px'}}>
//                         <Todolist
//                             key={index}
//                             todoListID={tl.id}
//                             title={tl.title}
//                             tasks={tasksForTodolist}
//                             removeTask={removeTask}
//                             changeFilter={changeFilter}
//                             addTask={addTask}
//                             checkBoxFilter={checkBoxFilter}
//                             removeTodoList={removeTodoList}
//                             filter={tl.filter}
//                             changeTaskTitle={changeTaskTitle}
//                             changeTodoListTitle={changeTodoListTitle}
//                         />
//                         </Paper>
//                     </Grid>
//                 })
//                 }
//                 </Grid>
//             </Container>
//         </div>
//     );
//
// }
//
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore