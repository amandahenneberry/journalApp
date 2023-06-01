import React from "react";
import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { Pen, CheckLg, X } from 'react-bootstrap-icons'
import EditTodo from "./EditTodo";



export default function SingleTodo({ id, taskName, todo, details, handleDelete, edit, setEdit, selectTask, handleSelect, handleEditChange, markComplete}) {
  const [hoverCheck, onHoverCheck] = useState(false)
  const [hoverEdit, onHoverEdit] = useState(false)
  const [hoverX, onHoverX] = useState(false)

  
  return (
    <li key={id}>
              
          {edit ? (
            <Stack gap={0}>
              <Row>
                <div>
                  {id === selectTask.id? 
                    (
                      <EditTodo selectTask={selectTask} handleEditChange={handleEditChange} setEdit={setEdit}/>
                      
                    )
                    :
                    (
                      <div style={{color: 'gray'}} >
                        {taskName}
                      </div>
                    )
                  }
                </div>
              </Row>
            </Stack>
            ) 
            : 
            (
              <Stack gap={0}>
                <Row>
                  <p>
                    {taskName}

                    {/* COMPLETE */}
                    <Button 
                      onMouseEnter={()=>{
                        onHoverCheck(true);
                      }}
                      onMouseLeave={()=>{
                        onHoverCheck(false);
                      }}
                      bsstyle='default'
                      size='sm'
                      style={{borderColor:'transparent' ,color:'green', backgroundColor: hoverCheck ? 'rgba(0, 0, 0, 0.05)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                      onClick={() => markComplete(todo)}>
                      <CheckLg />
                    </Button>
               
                      {/* EDIT */}
                    <Button
                      onMouseEnter={()=>{
                       onHoverEdit(true);
                     }}
                      onMouseLeave={()=>{
                       onHoverEdit(false);
                      }}
                      bsstyle='default'
                      size='sm'
                      style={{borderColor:'transparent' ,color:'gray', backgroundColor: hoverEdit ? 'rgba(0, 0, 0, 0.05)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                      onClick={()=>{handleSelect(todo); setEdit(true)}}>
                      <Pen />
                    </Button>

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
                      style={{borderColor:'transparent' ,color:'red', backgroundColor: hoverX ? 'rgba(0, 0, 0, 0.05)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                      onClick={(e) => handleDelete(id, e)}>
                      <X />
                    </Button>
                  </p>
                  <small>{!details ? null : <p style={{color: 'gray'}}>{details}</p>}</small>
                </Row>
              </Stack>
            )
          }
         
        </li>

  )
}