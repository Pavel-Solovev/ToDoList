import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";



function App() {
    let arrForTodolist1=[
        {id:1, title:'HTML&CSS', isDone:false},
        {id:2, title:'JS', isDone:true},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
        {id:3, title:'React', isDone:false},
    ]

    let arrForTodolist2=[
        {id:1, title:'HTML&CSS22222', isDone:true},
        {id:2, title:'JS22222', isDone:false},
        {id:3, title:'React222222', isDone:true},
    ]

    return (
        <div className="App">
            <ToDoList title={"Want to learn"} arrForTodolist1={arrForTodolist1}/>
            <ToDoList title_mid={'Songs'} arrForTodolist1={arrForTodolist2}/>
            {/*<ToDoList title={'Books'}/>*/}
        </div>
    );
}


export default App;
