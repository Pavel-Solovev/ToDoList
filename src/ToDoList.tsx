import React from "react";

type PropsType = {
    title?: string
    title_mid?: string
    arrForTodolist1: Array<inArray>
}

type inArray = {
    id: number,
    title: string,
    isDone: boolean
}

export const ToDoList = (props: PropsType) => {
    return (
        <div>
            <h3>
                {props.title}
                {props.title_mid}
            </h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.arrForTodolist1.map(m=>{
                    // debugger
                    return (
                        <li><input type="checkbox" checked={m.isDone}/>
                            <span>{m.title}</span></li>
                    )
                })}

                {/*<li><input type="checkbox" checked={props.arrForTodolist1[0].isDone}/>*/}
                {/*    <span>{props.arrForTodolist1[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[1].isDone}/>*/}
                {/*    <span>{props.arrForTodolist1[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.arrForTodolist1[2].isDone}/>*/}
                {/*    <span>{props.arrForTodolist1[2].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>)


}
//создать createReactApp
//скопировать сюда src того что мы делали
//так у вас получится два абсолютно одинаковых проекта (запустите оба)
