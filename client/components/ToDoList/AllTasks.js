import React from "react";
import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Pen, CheckLg, X } from 'react-bootstrap-icons'



export default function AllTasks({ todos, handleDelete, edit, setEdit}) {
  const [hoverCheck, onHoverCheck] = useState(false)
  const [hoverEdit, onHoverEdit] = useState(false)
  const [hoverX, onHoverX] = useState(false)

  
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
              
              {edit ? (
                <Stack gap={0}>
                <Row>
                <p>
                  {todo.taskName}
                  <button onClick={() =>{setEdit(false)}}>edit off</button>
                </p>
                <small>{!todo.details ? null : <p style={{color: 'gray'}}>{todo.details}</p>}</small>
                </Row>
                </Stack>
              ) : 
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
              onClick={() => setEdit(true)}>
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
               <small>{!todo.details ? null : <p style={{color: 'gray'}}>{todo.details}</p>}</small>
               </Row>
              </Stack>
               )
            }
         
        </li>
      ))}
    </ul>
  );
}
