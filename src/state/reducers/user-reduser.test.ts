import {changeNameAC, userReducer} from "./user-reducer";


test('user reducer should change name of user', () => {
    const startState = { name: 'Dimych', age: 20, childrenCount: 2 };
    const newName = 'Viktor';
    const endState = userReducer(startState, changeNameAC(newName))

    expect(endState.name).toBe(newName);
});
