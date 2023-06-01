import React from "react";
import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { X } from 'react-bootstrap-icons'



export default function SingleTodoCompleted({ id, taskName, details, handleDelete}) {
  const [hoverX, onHoverX] = useState(false)
  
  return (
    
        <li key={id}>
        <Stack gap={0}>
            <Row>
                <p>
                    {taskName}
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
        </li>
  )
}