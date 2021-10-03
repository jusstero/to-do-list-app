import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import "./App.css";
import APIFunctions from "./APIFunctions.js";


function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState([]);
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handlePriorityChange(evt) {
    setPriority(evt.target.value);
  }

  function handleDeadlineChange(evt) {
    setDeadline(evt.target.value);
  }

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIFunctions.getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  function updateTodos() {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIFunctions.getAllTodos();
      setTodos(todos);
      console.log(todos);
    };
    fetchTodoAndSetTodos();
  }

  const createTodo = async (evt) => {
    evt.preventDefault();
    let newTodo = await APIFunctions.createTodo(name, priority, 0, deadline);
    console.log(deadline);
    setTodos([...todos, newTodo]);
    setName("");
    setPriority("");
    setDeadline("");
    updateTodos();
    setDeadline(null);
  };

  const deleteTask = async (id) => {
    await APIFunctions.deleteTodo(id);
    setTodos(todos);
    updateTodos();
  };

  const toggleTaskCompleted = async (todoId) => {
    const payload = {
      name: todos.find((todo) => todo.id === todoId).name,
      is_done: !todos.find((todo) => todo.id === todoId).is_done,
      priority: todos.find((todo) => todo.id === todoId).priority,
      deadline: todos.find((todo) => todo.id === todoId).deadline,
    };
    const updatedTodo = await APIFunctions.updateTodo(todoId, payload);
    setTodos(todos.map((todo) => (todo.id === todoId ? updatedTodo : todo)));
    updateTodos();
  };

  const editTask = async (todoId, newPrio, newName) => {
    const payload = {
      name: newName,
      is_done: todos.find((todo) => todo.id === todoId).is_done,
      deadline: todos.find((todo) => todo.id === todoId).deadline,
      priority: newPrio,
    };

    const updatedTodo = await APIFunctions.updateTodo(todoId, payload);
    setTodos(todos.map((todo) => (todo.id === todoId ? updatedTodo : todo)));
    updateTodos();
  };

  const taskList = todos.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.is_done}
      dateCreated={task.date_created}
      priority={task.priority}
      key={task.id}
      deadline={task.deadline}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      createTodo={createTodo}
      editTask={editTask}
    />
  ));

  return (
    <div className="App">
      <h1 className="App-header">ToDo App</h1>

      <ul className="todo-list">
        <div className="form">
          <form className="task-form" onSubmit={createTodo}>
            <label className="todo-label">Task name</label>
            <input
              type="name"
              id="new-todo-name"
              className="input-task-name"
              name="task name"
              autoComplete="off"
              value={name}
              onChange={handleNameChange}
            />
            <br></br>
            <label className="todo-label">Deadline</label>
            <input
              type="date"
              id="deadline-date"
              className="input-task-deadline"
              name="deadline"
              value={deadline}
              onChange={handleDeadlineChange}
              placeholder=""
            />
            <br></br>
            <label className="todo-label">Priority</label>
            <input
              type="number"
              min="1"
              max="10"
              id="new-todo-priority"
              className="input-task-priority"
              name="task priority"
              autoComplete="off"
              value={priority}
              onChange={handlePriorityChange}
            />
            <br></br>
            <button type="submit" className="button">
              Add
            </button>
          </form>
        </div>
        <br></br>
        <div className="item-container">{taskList}</div>
      </ul>
    </div>
  );
}

export default App;
