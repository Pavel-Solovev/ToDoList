
import {taskReducer, addTaskAC, changeDoneAC, changeTitleTaskAC} from "./task-reducer";
import {TaskStateType} from "../../AppWithRedux";



let startState: TaskStateType = {

}

beforeEach(()=>{

    startState = {
        // "todolistId1": [
        //     { id: "1", title: "CSS", completed: false },
        //     { id: "2", title: "JS", completed: true },
        //     { id: "3", title: "React", completed: false }
        // ],
        // "todolistId2": [
        //     { id: "1", title: "bread", completed: false },
        //     { id: "2", title: "milk", completed: true },
        //     { id: "3", title: "tea", completed: false }
        // ]
    }
})

// test('correct task should be added to correct array', () => {
//
//     const action = addTaskAC( "juce");
//
//     const endState = taskReducer(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(4);
//     expect(endState["todolistId2"][0].id).toBeDefined();
//     expect(endState["todolistId2"][0].title).toBe("juce");
//     expect(endState["todolistId2"][0].completed).toBe(false);
// })


test('status of specified task should be changed', () => {

    const action = changeDoneAC("todolistId2", '2', 2);

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].completed).toBe(false);
    expect(endState['todolistId1'][1].completed).toBe(true);
});


test('title of specified task should be changed', () => {

    const action = changeTitleTaskAC("todolistId2", "2", 'name');

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('name');
    expect(endState['todolistId1'][1].title).toBe("JS");
});
