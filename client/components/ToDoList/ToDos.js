import React, { useState } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";



export const ToDos = () =>{
    const [newTask, setNewTask] = useState({});

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewTask((prev) => ({ ...prev, id: Date.now(), [name]: value }));
    };

    const [allTasks, setAllTasks] = useState([]);
    
    const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.title) return;
    setAllTasks((prev) => [newTask, ...prev]);
    setNewTask({});
    };

  const handleDelete = (taskIdToRemove) => {
    setAllTasks((prev) => prev.filter(
      (task) => task.id !== taskIdToRemove
    ));
  };

    return(
        <main>
        <h1>To Do List</h1>
        <NewTask
          newTask={newTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <AllTasks allTasks={allTasks} handleDelete={handleDelete} />
      </main>
    )
}