import React from "react";
import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Pen, CheckLg, X } from 'react-bootstrap-icons'
import Form from 'react-bootstrap/Form';
import { fetchTodo } from "../../store/auth";
import { useDispatch } from 'react-redux';

export default function AllTasks({ todos, handleDelete, edit, setEdit, editTodo}) {
  const [hoverCheck, onHoverCheck] = useState(false)
  const [hoverEdit, onHoverEdit] = useState(false)
  const [hoverX, onHoverX] = useState(false)
  const [todoEdit, setTodoEdit] = useState(null)
  const dispatch = useDispatch();
  // const todoEdit = useSelector(state => state.auth.todos)


  
  const handleEdit = (todo) =>{
    dispatch(fetchTodo(todo));
    setTodoEdit(todo);
  }

  const handleChange = ({target}) =>{
    const {name, value} = target;
    setTodoEdit((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
              
              {edit ? (
                <Stack gap={0}>
                <Row>
                  <div>
              <p>
                  {todo === todoEdit ? (
                    <>
                    {/* <Form onSubmit={handleSubmit}> */}
                    <Form>
                    <Form.Group>
                      <Row>
                      <Form.Control className="mb-3" classtype='text' name="taskName"  value={todoEdit.taskName || ''} onChange={handleChange}/>
                      </Row>
                    </Form.Group>
                    </Form>
                      EDITING: {todoEdit.taskName || ''}
                      <button onClick={() =>{setEdit(false)}}>edit off</button>
                      </>
                  ): (
                    <>
                       {todo.taskName}
                    </>
                    )}
              
                <small>{!todo.details ? null : < p style={{color: 'gray'}}>{todo.details}</p>}</small>
                </p>
                </div>
                </Row>
                </Stack>
              ) 
              : 
              (
                <Stack gap={0}>
                <Row>
                  <p>
                    {todo.taskName}
                <Button 
                  onMouseEnter={()=>{
                    onHoverCheck(true);
                  }}
                  onMouseLeave={()=>{
                    onHoverCheck(false);
                  }}
                  bsStyle='default'
                  size='sm'
                  style={{borderColor:'transparent' ,color:'green', backgroundColor: hoverCheck ? 'rgba(0, 0, 0, 0.2)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                  onClick={(e) => handleDelete(todo.id, e)}>
                  <CheckLg />
                </Button>
               
               <Button
               onMouseEnter={()=>{
                onHoverEdit(true);
              }}
              onMouseLeave={()=>{
                onHoverEdit(false);
              }}
              bsStyle='default'
              size='sm'
              style={{borderColor:'transparent' ,color:'gray', backgroundColor: hoverEdit ? 'rgba(0, 0, 0, 0.2)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
              onClick={() => {setEdit(true), handleEdit(todo)}}>
              <Pen />
              </Button>
               <Button 
                onMouseEnter={()=>{
                  onHoverX(true);
                }}
                onMouseLeave={()=>{
                  onHoverX(false);
                }}
                bsStyle='default'
                size='sm' 
                style={{borderColor:'transparent' ,color:'gray', backgroundColor: hoverX ? 'rgba(0, 0, 0, 0.2)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
               onClick={(e) => handleDelete(todo.id, e)}><X /></Button>
               </p>
               <small>{!todo.details ? null : <div style={{color: 'gray'}}>{todo.details}</div>}</small>
               </Row>
              </Stack>
               )
            }
         
        </li>
      ))}
    </ul>
  );
}
