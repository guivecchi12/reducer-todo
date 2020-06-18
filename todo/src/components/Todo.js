import React, {useState, useReducer} from "react";
import {initialState, todoReducer} from "../reducers/index";

const Todo = () => {

    const [newTodo, setNewTodo] = useState("");
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const handleChanges = e => {
        setNewTodo(e.target.value);
    };

    const toggleCompleted = (e) =>{
        const text = e.target.textContent;
        dispatch({type: "TOGGLE_COMPLETED", payload:text});
        e.target.classList.toggle("strike");
    }
    const clear = () => {
        setNewTodo("");
    }

    return (
        <div>
            <div>
                <input 
                    type="text"
                    name = "newTodo"
                    value = {newTodo}
                    onChange = {handleChanges}
                />
                <button onClick = {(e)=>{
                    e.preventDefault();
                    dispatch({ type: "ADD_ITEM", payload: newTodo})
                    clear();
                    // console.log(state);
                }}>
                    Add Todo
                </button>
            </div>

            <div>
                {state.map(element => {
                    return (<p onClick = {toggleCompleted}>{element.item}</p>);
                })}  
            </div>
                <button onClick = {()=>{console.log(state)}}>Check State</button>
        </div>
    );
};

export default Todo;