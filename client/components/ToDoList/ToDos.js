import React, { useState, useEffect } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';
// import { fetchTodo, postTodoThunk } from "../../store";
// import {connect} from 'react-redux'
import { useDispatch } from "react-redux";
import { postTodoThunk, deleteTodo, editTodo } from "../../store";

export const ToDos = ({ todos, todo, userId, setActive }) =>{
  const [newTask, setNewTask] = useState({});
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
   
  const handleChange = ({ target }) => {
      const { name, value } = target;
      setNewTask((prev) =>({ 
        ...prev, 
        [name]: value,
        userId: userId
      }));
  };

  const handleSubmit= (event) => {
  event.preventDefault();
  if (!newTask.taskName) return;
  // setAllTasks((prev) => [newTask, ...prev]);
  dispatch(postTodoThunk(newTask));
  setNewTask({});
  };

const handleDeleteTask = (taskIdToRemove, event) => {
  event.preventDefault();
  dispatch(deleteTodo(taskIdToRemove));

};


// useEffect(()=>{
//   setActive('toDos')
// }, [deleted]);

    return(
        <Form onSubmit={handleSubmit}>
          <AllTasks handleDelete={handleDeleteTask} handleSubmit={handleSubmit} newTask={newTask} todos={todos} todo={todo} edit={edit} setEdit={setEdit} editTodo={editTodo} />

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