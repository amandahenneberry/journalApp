import React, { useState, useEffect } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';
// import { fetchTodo, postTodoThunk } from "../../store";
// import {connect} from 'react-redux'
import { useDispatch } from "react-redux";
import { postTodoThunk, deleteTodo } from "../../store";

export const ToDos = ({ todos, userId }) =>{
  const [newTask, setNewTask] = useState({});
  const dispatch = useDispatch();

   
  const handleChange = ({ target }) => {
      const { name, value } = target;
      setNewTask((prev) =>({ 
        ...prev, 
        [name]: value,
        userId: userId
      }));
  };

  // const [allTasks, setAllTasks] = useState([]);
  // useEffect(()=>{
  //   setAllTasks(todos)
  // }, [])
  
  const handleSubmit= (event) => {
  event.preventDefault();
  if (!newTask.taskName) return;
  // setAllTasks((prev) => [newTask, ...prev]);
  dispatch(postTodoThunk(newTask));
  setNewTask({});
  };

const handleDeleteTask = (taskIdToRemove) => {
  // setAllTasks((prev) => prev.filter(
  //   (task) => task.id !== taskIdToRemove
  // ));
  dispatch(deleteTodo(taskIdToRemove))
};
    

    return(
        <Form onSubmit={handleSubmit}>
          <AllTasks handleChange={handleChange} handleDelete={handleDeleteTask} handleSubmit={handleSubmit} newTask={newTask} todos={todos} />

          <NewTask
          todos={todos}
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