import { db } from "../db.js"
import pgPromise from "pg-promise"
import { Request, Response } from "express"
import { toDoCreateScheme } from '../validation.js';


export const getAllTodos= async (req:Request,res:Response) => {
    const todos= await db.manyOrNone(`SELECT * FROM todos;`)
    return  res.status(200).json(todos);

}

export const createTodos= async(req:Request,res:Response)=>{

    console.log(req)
    const data=req.body
    const validate=toDoCreateScheme.validate(data)
    console.log(data);
    if(validate.error) {
        return res.status(400).json({message:"error todos not created succesfully"});
    }
    const {title,completed}= data
    console.log(completed);
    const newTodos= await db.none(`
    INSERT INTO todos(title, completed) VALUES($1, $2);`,[
        title,completed
    ])
    return res.status(200).json({message:`todos created`})
}

export const deleteTodos= async(req:Request,res:Response)=>{
    const {id} = req.params
  if(!id){
    return res.status(400).json({message:"erro id is null or undefined"});
  } 
  const deletedTodos= await db.oneOrNone(`
  DELETE FROM todos WHERE id=$1 RETURNING *`,Number(id))

  if(!deletedTodos) {
     return res.status(400).json({message:`'${id}' does not exist as ID`})
  } 
 return res.status(200).json({message:`'${id}' corrisponding todos deleted`})
}

export const modifyTodo = async(req:Request,res:Response) => {
    const {id, title, completed} = req.body;

    if(!id){
        return res.status(400).json({message:"erro id is null or undefined"});
    }
    
    const updatedId = await db.oneOrNone(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *`, [title, completed, id]);

    if(updatedId){
        return res.status(200).json({msg: "Todo was updated."})
    }
}

export const createImage = async (req:Request,res:Response) => {
    const {id} = req.params;
    const filePath = req.file?.path;
    console.log(filePath);

    await db.oneOrNone(`UPDATE todos SET imagePath=$1 WHERE id=$2`, [filePath, id])
    res.status(200).json({msg: "Operazione andata a buon fine."})
}