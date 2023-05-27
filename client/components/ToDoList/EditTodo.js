import React from "react";
import { useState, useEffect,  useSelector } from "react";
import { connect } from "react-redux";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { fetchTodo, editTodo } from "../../store";
import { useDispatch } from "react-redux";

function EditTodo(props) {
    // const {todo, todos, handleDelete, edit, setEdit, selectTask, setSelectTask, handleSelect, handleEditChange} = props
    const{todo} = props;
    const dispatch = useDispatch();

    const {selectTask, setEdit={setEdit}, handleEditChange={handleEditChange}} = props
    //useSelector...
    // const todo = useSelector(state=>state.auth.todo);
    useEffect(()=>{
        console.log('mapped state: '+{todo})
    }, [])
    useEffect(()=>{
        console.log('select state: '+{selectTask})
    }, [])

    const  handleSubmitEdit =(evt)=>{
      evt.preventDefault();
      dispatch(editTodo({...todo, ...selectTask}))
      setEdit(false)
      
    }
    // const handleEditChange=(evt)=>{
    //     evt.preventDefault();
    //     setSelectTask({
    //         [evt.target.name]: evt.target.value,
    //     });
    //   }
 
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
                            // onChange={handleChange}
                            />
                            </th>
                            <th>
                              <button onClick={() =>{setEdit(false)}}>Cancel</button>
                              <button  onClick={handleSubmitEdit}>Submit</button>
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
                            // onChange={handleChange}
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
