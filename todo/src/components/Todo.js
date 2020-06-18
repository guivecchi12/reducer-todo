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
        // console.log(state);
        state.map(task => {
            // console.log(task);
            if(task.item === text){
                // console.log("matched text");
                if(task.completed === true){
                    // console.log("COMPLETED")
                    e.target.classList.add("strike");
                }
                else{
                    // console.log("not Completed")
                    e.target.classList.remove("strike");
                };
            };
        });
    }

    const clear = () => {
        setNewTodo("");
    }

    const clearCompleted = () => {
        const clearedState = state.filter(task => task.completed === false);
        const tasks = document.querySelectorAll('.task');
        dispatch({type: "CLEAR_COMPLETED", payload:clearedState});
        console.log(tasks);
        tasks.forEach(todo => {
            console.log(todo.classList);
            if(todo.classList.contains("strike")){
                console.log("We found one!");
                todo.classList.remove("strike");
            }
            
        });

        // tasks.forEach(todo => {
        //     console.log(todo);
        //     state.map(element => {
        //         if(element.item === todo.textContent){
        //             console.log("item matches text");
        //             if(element.completed === false){
        //                 console.log("not completed");
        //                 todo.classList.remove("strike");
        //             }
        //             else{
        //                 console.log("completed");
        //                 todo.classList.add("strike");
        //             }
        //         }
        //     });
        // })
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
                    return (<p onClick = {toggleCompleted} className = {'task'} >{element.item}</p>);
                })}  
            </div>
            <button onClick = {()=>{console.log(state)}}>Check State</button>
        </div>
    );
};

export default Todo;