import React from "react";
import { connect } from "react-redux";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { editTodo } from "../../store";
import { useDispatch } from "react-redux";

function EditTodo(props) {
  const{todo} = props;
  const dispatch = useDispatch();

  const {selectTask, setEdit, handleEditChange} = props
 

  const  handleSubmitEdit =(evt)=>{
    evt.preventDefault();
    dispatch(editTodo({...todo, ...selectTask}))
    setEdit(false)
    
  }

  return(
      <>
      <table>
        <tbody>
          <tr>
            <th>
              <Form.Control
                className="mb-3" 
                classtype='text' 
                name="taskName"
                placeholder= "Enter a task..."
                value={selectTask.taskName || ""}
                onChange={handleEditChange}
              />
            </th>
            <th>
              <Button size='sm' onClick={handleSubmitEdit}>Submit</Button>
              <Button size='sm' variant="outline-primary" onClick={() =>{setEdit(false)}}>Cancel</Button>
            </th>  
          </tr>
        </tbody>
      </table>
      <Form.Control 
        type='textarea'
        name="details"
        value={selectTask.details || ""}
        placeholder="Details..."
        onChange={(e)=>handleEditChange(e)}
        size="sm"
      />
    </>
  )
}

const mapStateToProps = (state) =>{
    return{
        todo: state.auth.todo
    }
}

export default connect(mapStateToProps)(EditTodo);
