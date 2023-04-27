import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'

export default function NewTask({ newTask, handleChange, handleSubmit }) {
  return (
    <Form.Group>
      <Row>
      <Form.Control className="mb-3" classtype='text' name="title" placeHolder= "Enter new task..." value={newTask.title || ''}  onSubmit={handleSubmit} onChange={handleChange}/>
      {!newTask.title ? null : (
        <>
        <Form.Control 
          type='textarea'
          name="description"
          placeholder="Details..."
          value={newTask.description || ""}
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