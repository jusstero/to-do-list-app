/* 

import React, { useState } from "react";

export default function Form(props) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault(e);
    Todo.addTask(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
    console.log(name)
  }

  return (
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
  );
} 

*/