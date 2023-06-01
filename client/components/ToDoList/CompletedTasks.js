import React from "react";
import SingleTodoCompleted from "./SingleTodoCompleted";



export default function CompletedTasks({ todos, handleDelete}) {
  
  return (
    <ul>
      {todos
      .filter((todo) => todo.completed === true)
      .map((todo) => (
        <SingleTodoCompleted id={todo.id} taskName={todo.taskName} details={todo.details} handleDelete={handleDelete}/>
      ))}
    </ul>
  );
}