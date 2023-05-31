import React from "react";
import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { Pen, CheckLg, X } from 'react-bootstrap-icons'
import EditTodo from "./EditTodo";



export default function CompletedTasks({ todos, handleDelete}) {
  const [hoverCheck, onHoverCheck] = useState(false)
  const [hoverEdit, onHoverEdit] = useState(false)
  const [hoverX, onHoverX] = useState(false)

  
  return (
    <ul>
      {todos
      .filter((todo) => todo.completed === true)
      .map((todo) => (
        <li key={todo.id}>
        <Stack gap={0}>
            <Row>
                <p>
                    {todo.taskName}
                    {/* DELETE */}
                    <Button 
                      onMouseEnter={()=>{
                        onHoverX(true);
                      }}
                      onMouseLeave={()=>{
                        onHoverX(false);
                      }}
                      bsstyle='default'
                      size='sm' 
                      style={{borderColor:'transparent' ,color:'gray', backgroundColor: hoverX ? 'rgba(0, 0, 0, 0.2)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                      onClick={(e) => handleDelete(todo.id, e)}>
                      <X />
                    </Button>
                </p>
                  <small>{!todo.details ? null : <p style={{color: 'gray'}}>{todo.details}</p>}</small>
            </Row>
        </Stack> 
        </li>
      ))}
    </ul>
  );
}