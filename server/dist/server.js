import express from 'express';
import morgan from 'morgan';
import "express-async-errors";
import { setupDb } from './db.js';
import { createTodos, deleteTodos, getAllTodos } from './controller/controller.js';
setupDb();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
const port = 3000;
let elements = [{ id: 1, title: 'todo_1' }, { id: 2, title: 'todo_2', completed: false }];
app.get('/api/todos', getAllTodos);
app.post("/api/todo/create", createTodos);
app.delete("/api/todo/:id", deleteTodos);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
