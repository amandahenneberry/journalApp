import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { postTodoThunk, deleteTodo, editTodo, fetchTodo } from "../../store";

export const ToDos = ({ todos, userId }) =>{
  const [newTask, setNewTask] = useState({});
  const [edit, setEdit] = useState(false);
  const [selectTask, setSelectTask] = useState('')
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
  dispatch(postTodoThunk(newTask));
  setNewTask({});
  };

  const handleSelect = (task) =>{
    setSelectTask(task);
    setEdit(true)
  }

  useEffect(()=> console.log('task selected: '+ selectTask.taskName), [selectTask]
  )

  const handleDeleteTask = (taskIdToRemove, event) => {
  event.preventDefault();
  dispatch(deleteTodo(taskIdToRemove));
};

  return(
    <Form onSubmit={handleSubmit}>
      <AllTasks 
        handleChange={handleChange} 
        handleDelete={handleDeleteTask} 
        handleSubmit={handleSubmit} 
        newTask={newTask} 
        todos={todos} 
        edit={edit} 
        setEdit={setEdit} 
        selectTask={selectTask}
        setSelectTask={setSelectTask}
        handleSelect={handleSelect}
      />
      <NewTask
        todos={todos}
        newTask={newTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Form>
  )
}

const mapStateToProps = (state) =>{
  return{
      todo: state.auth.todo,
  }
}

export default connect(mapStateToProps)(ToDos);