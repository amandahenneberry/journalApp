import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { postTodoThunk, deleteTodo, editTodo, fetchTodo } from "../../store";

export const ToDos = ({ todos, userId }) =>{
 
  const dispatch = useDispatch();
   
 //ADD TASKS
 const [newTask, setNewTask] = useState({});

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




//  EDIT A TASK
  const [edit, setEdit] = useState(false);
  const [selectTask, setSelectTask] = useState('')
  const [todo, setTodo] = useState({})

  const handleSelect = (task) =>{
    setSelectTask(task);
    dispatch(fetchTodo(task.id));
    setEdit(true);
    }

  const handleEditChange=(evt)=>{
    evt.preventDefault();
    setSelectTask({
        [evt.target.name]: evt.target.value
    })
  }

  useEffect(()=> console.log('task selected: '+ selectTask.taskName), [selectTask])

  
  //DELETE A TASK
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
        handleEditChange={handleEditChange}
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
      todo: state.auth.todo
  }
}

export default connect(mapStateToProps)(ToDos);