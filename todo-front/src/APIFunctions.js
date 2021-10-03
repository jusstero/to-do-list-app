import axios from "axios"

const API_URL = "https://tamk-4a00ez62-3002-group24.herokuapp.com/api/"

async function createTodo(name, priority, is_done, deadline) {
  const { data: newTodo } = await axios.post(API_URL, { 
    name, priority, is_done, deadline
  })
  return newTodo
}

async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function updateTodo(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
  return newTodo
}

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos }