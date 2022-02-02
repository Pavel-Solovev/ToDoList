import React, {useState} from 'react';
import './App.css';
import {Todolist} from './ToDoList';
import {v1} from 'uuid';

export type FilterValuesType = "All" | "Active" | "Completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType ={
    id: string
    title:string
    isDone:boolean
}

export type TaskStateType = {
    [key: string]:Array<TaskType>
}

function App() {


    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const todoListID_3 = v1()


    const [todoList, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'All'},
        {id: todoListID_2, title: 'What to buy', filter: 'All'},
        {id: todoListID_3, title: 'What to read', filter: 'All'},
    ])


    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true}, //"completed"
            {id: v1(), title: "JS/ES6", isDone: true}, // "completed"
            {id: v1(), title: "REACT", isDone: true}, // "completed"
        ],
        [todoListID_2]: [
            {id: v1(), title: "Sidr", isDone: false}, //"completed"
            {id: v1(), title: "Meat", isDone: false}, // "completed"
            {id: v1(), title: "Milk", isDone: false}, // "completed"
        ],
        [todoListID_3]: [
            {id: v1(), title: "Book 1", isDone: true}, //"completed"
            {id: v1(), title: "Book 2", isDone: false}, // "completed"
            {id: v1(), title: "Book 3", isDone: true}, // "completed"
        ],
    })

    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(f=>f.id!==id)})

    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})

    }

    let checkBoxFilter = (todoListID: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(m=>m.id === id ? {...m, isDone}: m)})
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodolists(todoList.map((m) => m.id === todoListID ? {...m, filter: value} : m))
    }
    const removeTodoList = (todoListID: string) =>
        setTodolists(todoList.filter((f) => f.id !==todoListID))



    return (
        <div className="App">
            {todoList.map((tl, index) => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "Active") {
                    tasksForTodolist = tasks[tl.id].filter(tl => !tl.isDone);
                }
                if (tl.filter === "Completed") {
                    tasksForTodolist = tasks[tl.id].filter(tl => tl.isDone);
                }
                return (
                    <Todolist
                        key={index}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        checkBoxFilter={checkBoxFilter}
                        removeTodoList={removeTodoList}
                        filter={tl.filter}
                    />)
            })

            }
        </div>
    );
}

export default App;
