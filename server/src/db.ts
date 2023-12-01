import pgPromise from "pg-promise";
import dotenv from   "dotenv";
import { log } from "console";



export const db=pgPromise()({
    host:"127.0.0.1",
    port:5432,
    database:"postgres",
    user:"postgres",
    password:"postgres"
})

export const setupDb=async()=>{
    await db.none(`
        DROP TABLE IF EXISTS todos;
        CREATE TABLE IF NOT EXISTS todos(
        id SERIAL NOT NULL PRIMARY KEY,
        title TEXT NOT NULL ,
        completed TEXT 
        );
    `)
    try {
        const response =await db.none(`
        INSERT INTO todos (title) VALUES ('compare pane');`)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
   
}