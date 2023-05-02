import React, { useState, useEffect } from "react";
import AllTasks from "./AllTasks";
import NewTask from "./NewTask";
import Form from 'react-bootstrap/Form';
// import { fetchTodo, postTodoThunk } from "../../store";
// import {connect} from 'react-redux'

export const ToDos = ({handleChange, handleSubmit, handleDelete, newTask, allTasks }) =>{

    

    return(
        <Form onSubmit={handleSubmit}>
          <AllTasks allTasks={allTasks} handleDelete={handleDelete} />

          <NewTask
          newTask={newTask}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Form>
    )
}

// const mapDispatch = (dispatch) =>{
//   return{
//     createTodo: (todo) => dispatch(postTodoThunk(todo))

//   }
// }

// export default connect(null, mapDispatch)(ToDos)