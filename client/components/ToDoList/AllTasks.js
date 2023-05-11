import React from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';


export default function AllTasks({ todos, handleDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Stack gap={0}>
          <Row>
            <p>{todo.taskName} <Button size='sm' variant='outline-primary' style={{fontSize: '10px'}} onClick={() => handleDelete(todo.id)}>x</Button></p>
          
          <small>{!todo.details ? null : <p style={{color: 'gray'}}>{todo.details}</p>}</small>
          </Row>
          </Stack>
          
          
        </li>
      ))}
    </ul>
  );
}
