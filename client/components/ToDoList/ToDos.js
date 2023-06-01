import React, { useState, useEffect } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import CompletedTasks from "./CompletedTasks";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { postTodoThunk, deleteTodo, fetchTodo,  editTodo } from "../../store";

export const ToDos = ({ todos, userId }) =>{
  const [viewToggle, setViewToggle] = useState(false)
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
  const [complete, setComplete] = useState('')
  const [completeToggle, setCompleteToggle] = useState(false)
  const [sendComplete, setSendComplete] = useState(false);
 

  async function markComplete(task){
    const todoItem = todos.find(item => item.id === task.id);
    await setComplete(todoItem);
    setCompleteToggle(!completeToggle)
  }

  useEffect(() => {
    setComplete((prev) => ({
      ...prev,
      completed: true
    }));
    setSendComplete(!sendComplete)
  }, [completeToggle])

  useEffect(() => {
    dispatch(editTodo({...complete}))
   console.log('sent: '+complete.taskName+ ' completed when sent?: '+complete.completed) 
  }, [sendComplete])

 
  //DELETE A TASK
  const handleDeleteTask = (taskIdToRemove, event) => {
    event.preventDefault();
    dispatch(deleteTodo(taskIdToRemove));
  };

  return(
    <>
    {viewToggle === false ? (
      <>
      <Stack>
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
      <Row>
    <Button variant='link' onClick={()=>setViewToggle(!viewToggle)}>view completed tasks</Button>
    </Row>
    </Form>
    </Stack>
    
    </>
    ) :(
      <Stack>
        <Row>
        <Button variant='link' onClick={()=>setViewToggle(!viewToggle)}>view 'to do' list</Button>
        </Row>
        <CompletedTasks todos={todos} handleDelete={handleDeleteTask}/>
      </Stack>
    )}
  </>
  )
}