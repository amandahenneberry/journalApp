import React, { useState } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';




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
        <Form onSubmit={handleSubmit}>
          <AllTasks allTasks={allTasks} handleDelete={handleDelete} />

          <NewTask
          newTask={newTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Form>
    )
}