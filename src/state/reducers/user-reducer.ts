type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}


export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            state.age = state.age + 1;
            return state;
        case 'INCREMENT-CHILDREN-COUNT':
            state.childrenCount = state.childrenCount + 1;
            return state;
        case 'CHANGE-NAME': {
            return {...state, name: action.newName}
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const changeNameAC=(newName:string)=>{
    return {
        type: 'CHANGE-NAME',
        newName
    }
}