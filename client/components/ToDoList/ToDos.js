import React, { useState, useEffect } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';
// import { fetchTodo, postTodoThunk } from "../../store";
// import {connect} from 'react-redux'

export const ToDos = ({ todos }) =>{

    const [newTask, setNewTask] = useState({});
   
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewTask((prev) => ({ ...prev, id: Date.now(), [name]: value }));
    };

    const [allTasks, setAllTasks] = useState([]);
    useEffect(()=>{
      setAllTasks(todos)
    }, [])
    
    const handleSubmit = (event) => {

    event.preventDefault();
    if (!newTask.taskName) return;
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

// const mapDispatch = (dispatch) =>{
//   return{
//     createTodo: (todo) => dispatch(postTodoThunk(todo))

//   }
// }

// export default connect(null, mapDispatch)(ToDos)