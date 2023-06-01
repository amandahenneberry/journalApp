import React from "react";
import { useStae } from "react";
import SingleTodo from "./SingleTodo";



export default function AllTasks({ todos, handleDelete, edit, setEdit, selectTask, handleSelect, handleEditChange, markComplete}) {


  
  return (
    <ul>
      {todos
      .filter((todo) => todo.completed === false)
      .map((todo) => (
        <SingleTodo id={todo.id} todo={todo} taskName={todo.taskName} details={todo.details} handleDelete={handleDelete} edit={edit} setEdit={setEdit} selectTask={selectTask} handleSelect={handleSelect} handleEditChange={handleEditChange} markComplete={markComplete}/>
      ))}
    </ul>
  );
}