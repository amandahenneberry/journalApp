import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'

export default function NewTask({ newTask, handleChange, handleSubmit }) {
  return (
    <Form.Group>
      <Row>
      <Form.Control className="mb-3" classtype='text' name="taskName" placeholder= "Enter new task..." value={newTask.taskName || ''}  onSubmit={handleSubmit} onChange={handleChange}/>
      {!newTask.taskName ? null : (
        <>
        <Form.Control 
          type='textarea'
          name="details"
          placeholder="Details..."
          value={newTask.details || ""}
          onChange={handleChange}
          size="sm"
          />
         
          <Button variant="secondary" size="small" type="submit">Add Task</Button>
        </>
      )}
      </Row>
    </Form.Group>
    
  );
}