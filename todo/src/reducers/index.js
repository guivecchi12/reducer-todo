export const initialState = [{
    item: 'Learn about reducers',
    completed: false,
    id:3892987589
}];

export const todoReducer = (state, action) =>{
    // console.log(state);
    switch(action.type){
        case "ADD_ITEM":
            return [...state, {item: action.payload, completed:false, id: Date.now()}];
        case "TOGGLE_COMPLETED":
            // console.log(state, action.payload);
            return [ ... state, state.map(todo => {
                if (todo.item === action.payload)
                {
                    todo.completed = !todo.completed;
                };
            })];
        default:
            return state;
    }
};