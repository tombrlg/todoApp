// npm init -y
// npm install express mongoose cors

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialisierung der Express-App
const app = express();

// Verbindung zur MongoDB-Datenbank
mongoose.connect('mongodb://dbUser:dbPass@localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Definition des Schemas für die To-Do-Liste
const todoSchema = new mongoose.Schema({
    task: String
});

// Erstellung des Models für die To-Do-Liste
const Todo = mongoose.model('Todo', todoSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Endpoints
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.send(todos);
});

app.post('/todos', async (req, res) => {
    const todo = new Todo({
        task: req.body.task
    });
    await todo.save();
    res.send(todo);
});

app.delete('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.send(todo);
});

// Starten des Servers
const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
