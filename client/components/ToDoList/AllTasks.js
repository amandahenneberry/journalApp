import React from "react";
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';


export default function AllTasks({ allTasks, handleDelete }) {
  return (
    <ul>
      {allTasks.map(({ title, description, id }) => (
        <li key={id}>
          <Stack gap={0}>
          <Row>
            <p>{title} <Button size='sm' variant='outline-primary' style={{fontSize: '10px'}} onClick={() => handleDelete(id)}>x</Button></p>
          
          <small>{!description ? null : <p style={{color: 'gray'}}>{description}</p>}</small>
          </Row>
          </Stack>
          
          
        </li>
      ))}
    </ul>
  );
}
