const mysql = require("mysql");
const config = require("./config.js");
config.connectionLimit = 10;
let connection = mysql.createPool(config);
connection.on("acquire", function (connection) {
  console.log(`Connection ${connection.threadId} acquired`);
});

let connectionFunctions = {
  connect: () => {
    connection.connect();
  },

  close: (callback) => {
    connection.end();
  },

  save: (todo, callback) => {
    connection.query(
      "INSERT INTO todos(name, is_done, priority, deadline) VALUES(?, ?, ?, ?)",
      [todo.name, todo.is_done, todo.priority, todo.deadline],
      (err) => {
        if (err) {
          console.log(err);
        } else callback();
      }
    );
  },

  findAll: (callback) => {
    connection.query("SELECT * FROM todos", (err, todos) => {
      if (err) {
        console.log(err);
      }
      callback(todos);
    });
  },

  deleteById: (id, callback) => {
    connection.query("DELETE FROM todos WHERE id=?", [id], (err, todos) => {
      return callback(todos);
    });
  },

  findById: (id, callback) => {
    connection.query("SELECT * FROM todos WHERE id=?", [id], (err, todos) => {
      return callback(todos);
    });
  },

  update: (todo, id, callback) => {
    connection.query(
      "UPDATE todos SET name=?, is_done=?, priority=?, deadline=? WHERE id=?",
      [todo.name, todo.is_done, todo.priority, todo.deadline, id],
      (err, todo) => {
        if (err) {
          console.log(err);
        } else callback(todo);
      }
    );
  },
};

module.exports = connectionFunctions;
