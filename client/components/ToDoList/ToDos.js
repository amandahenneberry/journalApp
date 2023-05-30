import React, { useState, useEffect } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { postTodoThunk, deleteTodo, fetchTodo,  editTodo } from "../../store";

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
  const [selectTask, setSelectTask] = useState({ taskName: '', details: ''})

  const handleSelect = (task) =>{
    const todoItem = todos.find(item => item.id === task.id);
    setSelectTask(todoItem)
    dispatch(fetchTodo(task.id));
  }


  const handleEditChange=({ target })=>{
    const { name, value } = target;    
    setSelectTask((prev)=>({
      ...prev,
        [name]: value
    }))
  }

  useEffect(()=> console.log('task selected: '+ selectTask.taskName), [selectTask])

  //MARK TASK COMPLETE
  const markComplete = (task, event) => {
    event.preventDefault();
    const promise1 = new Promise ((res, rej) =>res(handleSelect(task)));
    const promise2  = new Promise((res, rej)=>res( 
      setSelectTask((prev) => ({
      ...prev,
      completed: true
    }))
    ));
    promise1.then(() =>promise2.then(()=>console.log('completed: '+selectTask.completed)
    ))
    // dispatch(editTodo(selectTask))
  }


  
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
        markComplete={markComplete}
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