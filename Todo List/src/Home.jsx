import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa"; // Import icons

function Home() {
    const [todos, setTodos] = useState([]); // Store todos

    // Fetch todos from the backend
    useEffect(() => {
        axios.get("http://localhost:1012/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    // Handle delete
    const handleDelete = (id) => {
        axios.delete(`http://localhost:1012/delete/`+id)
            .then(() => {
                location.reload()
            })
            .catch(err => console.log(err));
    };

    // Handle Mark as Done
    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className="container">
            <h2>Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div className="no-records"><h2>No Records</h2></div>
            ) : (
                todos.map((todo, index) => {
                    return (<div key={index} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                        <span>{todo.task}</span>
                        <div className="icons">
                            <FaCheck className="mark-icon" onClick={() => toggleComplete(todo._id)} />
                            <FaTrash className="delete-icon" onClick={() => handleDelete(todo._id)} />
                        </div>
                    </div>)
                })
            )}
        </div>
    );
}

export default Home;
