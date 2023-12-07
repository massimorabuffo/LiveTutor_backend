import express from 'express';
import morgan from 'morgan';
import "express-async-errors"
import { Request, Response } from "express";
import { ToDo } from './models/todo';
import { log } from 'console';
import { toDoCreateScheme } from './validation.js';
import { setupDb } from './db.js';
import { createImage, createTodos, deleteTodos, getAllTodos, modifyTodo } from './controller/controller.js';
import {upload} from "./uploadImage.js"


setupDb();
const app = express();
app.use(express.json())
app.use(morgan('dev'));
const port = 3000;

let elements:ToDo[] = [{id: 1, title: 'todo_1'}, {id: 2, title: 'todo_2', completed: false}]

app.get('/api/todos',getAllTodos);

app.post("/api/todo/create",createTodos)

app.delete("/api/todo/:id",deleteTodos);

app.post("/api/todo/modify", modifyTodo);

app.post("/api/todo/:id/image", upload.single("image"), createImage)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });




  

