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
        
        e.target.classList.toggle("strike");
        dispatch({type: "TOGGLE_COMPLETED", payload:text});
        
    }
    const clear = () => {
        setNewTodo("");
    }

    const clearCompleted = () => {
        const clearedState = state.filter(task => task.completed === false);
        const tasks = document.querySelectorAll('p');
        tasks.forEach(todo => {
            state.map(element => {
                if(element.item === todo){
                    if(element.completed === false){
                        todo.classList.remove("strike");
                    }
                    else{
                        todo.classList.add("strike");
                    }
                }
            });
        })
        dispatch({type: "CLEAR_COMPLETED", payload:clearedState});
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
                <button onClick = {clearCompleted}>Clear Completed Tasks</button>
            </div>

            <div>
                {state.map((element, index) => {
                    return (<p onClick = {toggleCompleted} className = {`task${index}`} >{element.item}</p>);
                })}  
            </div>
            <button onClick = {()=>{console.log(state)}}>Check State</button>
        </div>
    );
};

export default Todo;