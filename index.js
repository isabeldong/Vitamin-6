// Create the Server:
// Create an index.js file in the project folder.
// Set up a basic Express server that listens on port 3000:
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Create To-Do List Data Storage:
// Use a simple in-memory array to store to-do items for now:
let todos = [];

// Implement the Endpoints:
// Add the following endpoints:
// GET /todos: Retrieve all to-do items.
app.get('/todos', (req, res) => {
  res.json(todos);
});
// POST /todos: Add a new to-do item.
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
// PUT /todos/: Update an existing to-do item.
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));

  if (todo) {
    todo.task = task;
    res.json(todo);
  } else {
    res.status(404).send('To-Do item not found');
  }
});
// DELETE /todos/: Delete a to-do item.
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});
