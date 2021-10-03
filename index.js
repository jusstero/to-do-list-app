const express = require("express");
const app = express();

const connection = require("./database/crudrepository.js");

var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("todo-front/build/"));

// Get all todos
app.get("/api", (req, res) => {
  connection.findAll((todos) => res.send(todos));
});

app.get("/api/:myVariable([0-9]+)", (req, res) => {
  let id = req.params.myVariable;
  connection.findById(id, (todo) => res.send(todo));
});

app.delete("/api/:myVariable([0-9]+)", (req, res) => {
  let id = req.params.myVariable;
  connection.deleteById(id, (todo) => res.send(todo));
});

app.post("/api", (req, res) => {
  let todo = {
    name: req.body.name,
    is_done: req.body.is_done,
    priority: req.body.priority,
    deadline: req.body.deadline,
  };
  connection.save(todo, (todo) => res.send(todo));
});

app.put("/api/:myVariable([0-9]+)", (req, res) => {
  let todo = {
    name: req.body.name,
    is_done: req.body.is_done,
    priority: req.body.priority,
    deadline: req.body.deadline,
  };

  let id = req.params.myVariable;
  connection.update(todo, id, (todo) => res.send(todo));
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
