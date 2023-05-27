import React from "react";
import { useState, useEffect,  useSelector } from "react";
import { connect } from "react-redux";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { fetchTodo, editTodo } from "../../store";


function EditTodo(props) {
    // const {todo, todos, handleDelete, edit, setEdit, selectTask, setSelectTask, handleSelect, handleEditChange} = props
    const{todo} = props;
    const {selectTask, setSelectTask,  handleEditChange setEdit} = props
    //useSelector...
    // const todo = useSelector(state=>state.auth.todo);
    useEffect(()=>{
        console.log('mapped state: '+{todo})
    }, [])
    useEffect(()=>{
        console.log('select state: '+{selectTask})
    }, [])

    // const handleEditChange=(evt)=>{
    //     evt.preventDefault();
    //     setSelectTask({
    //         [evt.target.name]: evt.target.value,
    //     });
    //   }
 
    return(
        <>
        {selectTask.editing === true? (
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
                          value={selectTask.taskName || ''}
                          onChange={(e)=>handleEditChange(e)}
                        // onChange={handleChange}
                        />
                    </th>
                    <th>
                        <button onClick={() =>{setEdit(false)}}>edit off</button>
                    </th>  
                </tr>
            </tbody>
        </table>
                    
        {!selectTask.details ? (null): 
            (
                <Form.Control 
                    type='textarea'
                    name="details"
                    value={selectTask.details}
                    placeholder="Details..."
                    onChange={(e)=>handleEditChange(e)}
                    // onChange={handleChange}
                    size="sm"
                />
            )
        }
        </>
        ):(null)}
            
        </>
    )
}

const mapStateToProps = (state) =>{
    return{
        todo: state.auth.todo
    }
}

export default connect(mapStateToProps)(EditTodo);
