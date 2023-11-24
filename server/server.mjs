import {createServer, request} from "node:http"
import { json } from "stream/consumers"


const elements = [{id: 1, title: 'todo_1'}, {id: 2, title: 'todo_2', completed: false}]

const getToDo = createServer((request,response)=> {
    response.setHeader("Content-Type","application/json")
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    const sendData= JSON.stringify(elements)
    response.end(sendData)
})

getToDo.listen(3000)


const deleteTodo = createServer((request,response)=>{
    response.setHeader("Content-Type","application/json")
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    const url= new URL(request.url, "https://example.com")
    const { searchParams,pathname } = url;
    const id = searchParams.get('id') 
    // console.log(url);
    // console.log(id);
    response.end("ciao")
})

deleteTodo.listen(3001, ()=>{console.log("listen 3001");})

