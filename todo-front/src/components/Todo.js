import React, { useState } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  let date = new Date(props.dateCreated);
  let readableDate = date.toDateString();

  if (props.deadline == null) {
    var readableDeadline;
  } else {
    var deadlineDate = new Date(props.deadline);
    var readableDeadline = deadlineDate.toDateString();
  }

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, props.priority, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div className="task-form">
        <label>
          <span>Task name</span>
        </label>
        <input
          id={props.id}
          className="input-task-name"
          type="name"
          value={newName}
          onChange={handleChange}
        />
        <div className="btn-group">
          <button
            type="button"
            className="button"
            onClick={() => setEditing(false)}
          >
            Cancel
            <span className="visually-hidden"> </span>
          </button>
          <button type="submit" className="button">
            Save
            <span className="visually-hidden"></span>
          </button>
        </div>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="todo-item">
      <input
        id={props.id}
        type="checkbox"
        className="checked"
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
      <label className="todo-label" htmlFor={props.id}>
        {props.name}
        <br></br>Priority: {props.priority}
        <br></br>Created: {readableDate}
        <br></br>Deadline: {readableDeadline}
      </label>
      <div className="btn-group">
        <button
          type="button"
          className="button"
          onClick={() => setEditing(true)}
        >
          Edit task <span className="visually-hidden"></span>
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete task <span className="visually-hidden"></span>
        </button>{" "}
      </div>
    </div>
  );
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
