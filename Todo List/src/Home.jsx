import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { FaTrash, FaCheck, FaEdit, FaSave } from "react-icons/fa";

function Home() {
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editTask, setEditTask] = useState("");

    useEffect(() => {
        axios.get("http://localhost:1012/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:1012/delete/` + id)
            .then(() => location.reload())
            .catch(err => console.log(err));
    };

    const toggleComplete = (id) => {
        axios.put(`http://localhost:1012/update/` + id)
            .then(() => location.reload())
            .catch(err => console.log(err));
    };

    const handleEdit = (id, task) => {
        setEditId(id);
        setEditTask(task);
    };

    const handleSave = (id) => {
        axios.put(`http://localhost:1012/edit/` + id, { task: editTask })
            .then(() => {
                setEditId(null);
                setEditTask("");
                location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <h2>Todo List</h2>
            <Create />
            {todos.length === 0 ? (
                <div className="no-records"><h2>No Records</h2></div>
            ) : (
                todos.map((todo, index) => (
                    <div key={index} className="todo-item">
                        {editId === todo._id ? (
                            <input
                                value={editTask}
                                onChange={(e) => setEditTask(e.target.value)}
                            />
                        ) : (
                            <span className={todo.done ? "completed" : ""}>{todo.task}</span>
                        )}

                        <div className="icons">
                        <FaCheck className="mark-icon" onClick={() => toggleComplete(todo._id)} />
                            {editId === todo._id ? (
                                <FaSave className="save-icon" onClick={() => handleSave(todo._id)} />
                            ) : (
                                <FaEdit className="edit-icon" onClick={() => handleEdit(todo._id, todo.task)} />
                            )}
                            <FaTrash className="delete-icon" onClick={() => handleDelete(todo._id)} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
