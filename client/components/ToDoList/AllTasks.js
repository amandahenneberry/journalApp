import React from "react";
import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { Pen, CheckLg, X } from 'react-bootstrap-icons'



export default function AllTasks({ todos, handleDelete, edit, setEdit, selectTask, setSelectTask, handleSelect}) {
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
                  {todo.id === selectTask.id? 
                    (

                      <Form>
                        <table>
                          <tr>
                            <th>
                            <Form.Control
                              className="mb-3" 
                              classtype='text' 
                              name="taskName"
                              placeholder= "Enter a task..."
                              value={selectTask.taskName || ""}
                            // onChange={handleChange}
                            />
                            </th>
                            <th>
                              <button onClick={() =>{setEdit(false)}}>edit off</button>
                            </th>  
                          </tr>
                        </table>
                        
                        {!selectTask.details ? (null): 
                         (
                            <Form.Control 
                            type='textarea'
                            name="details"
                            value={selectTask.details || ""}
                            placeholder="Details..."
                            // onChange={handleChange}
                            size="sm"
                            />
                          )
                        }
                      </Form>
                    )
                    :
                    (
                      <div style={{color: 'gray'}} >
                        {todo.taskName}
                      </div>
                    )
                  }
                </p>
              </Row>
            </Stack>
            ) 
            : 
            (
              <Stack gap={0}>
                <Row>
                  <p>
                    {todo.taskName}

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
                      style={{borderColor:'transparent' ,color:'green', backgroundColor: hoverCheck ? 'rgba(0, 0, 0, 0.2)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                      onClick={(e) => handleDelete(todo.id, e)}>
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
                      style={{borderColor:'transparent' ,color:'gray', backgroundColor: hoverEdit ? 'rgba(0, 0, 0, 0.2)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                      onClick={()=>handleSelect(todo)}>
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
                      style={{borderColor:'transparent' ,color:'gray', backgroundColor: hoverX ? 'rgba(0, 0, 0, 0.2)' : 'transparent', borderRadius: '50%', outline: 'none'}} 
                      onClick={(e) => handleDelete(todo.id, e)}>
                      <X />
                    </Button>
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