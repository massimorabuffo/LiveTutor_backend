import express from 'express';
import morgan from 'morgan';
import "express-async-errors"
import { Request, Response } from "express";
import { ToDo } from './models/todo';
import { log } from 'console';
import { toDoCreateScheme } from './validation.js';
import { setupDb } from './db.js';



setupDb();
const app = express();
app.use(morgan('dev'));
const port = 3000;

let elements:ToDo[] = [{id: 1, title: 'todo_1'}, {id: 2, title: 'todo_2', completed: false}]

app.get('/api/todos', (req:Request, res:Response) => {
  res.status(200).json(elements);
  });

app.delete("/api/todo/:id",(req:Request, res:Response) => {
  const {id} = req.params
  if(!id){
    return res.status(400).json({message:"erro id is null or undefined"});
  }
  if(elements.some(el => el.id === Number(id))){
    elements = elements.filter(el => el.id === Number(id));
    return res.status(200).json({message:`element '${id}' deleted`}).end();
  }
  res.status(400).json({message:`'${id}' does not exist as ID`});
});

app.get("/api/todo/create",(req:Request, res:Response) => {
  console.log(req.query)
  const data=req.query
  const validate=toDoCreateScheme.validate(data)
  console.log(validate);
  return res.status(200).json({message:"end"}).end();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });




  

