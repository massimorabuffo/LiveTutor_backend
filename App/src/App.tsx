import { useState, useEffect } from 'react'
import './App.css'
import InputForm from './InputForm'
import ToDoList from './ToDoList'
import { ToDo } from './models'
import useFetchToDo from './useFetch'
import axios from 'axios'
import useSWR from "swr";



function App() {

  
  const{data,error,isLoading}=useFetchToDo();
  console.log(data);
  
  useEffect(()=>{
  setToDo(data)
  },[data])
  const [toDo, setToDo] = useState<ToDo[]|undefined>(data);
  const [editToDo, setEditToDo] = useState<null | ToDo>()


  
  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void  => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const title = data.get("title") as string
    const completed = data.get("completed") as string
    setToDo(prev => [...prev, {id: Math.random(), title, completed: completed === "on" ? true : false}])
  }

  const handleEditToDo = (el: ToDo) => {
    setEditToDo(el)
  }

  const handleChangeInput = (e: any) => {
    setEditToDo(prev => {return {
      ...prev,
      title: e.target.value
    } as ToDo})
    console.log(editToDo);
  }

  const handleChangeCheck = (e: any) => {
    setEditToDo(prev => {return{
      ...prev,
      completed: e.target.completed === "on" ? true : false
    } as ToDo})
  }

  const fetchPort=(id: number)=>{
    axios.get(`http://localhost:3001?id=${id}`).then((res)=> res.data )
  }


    if(error) {
      return (
        <>
        <p> Error</p>
        </>
      )
    }


    if(isLoading) {
      return (
        <>
        <p>Loading...</p>
        </>
      )
    }

  return (
    <>
    <InputForm handleSubmit={handleSubmit}/>
    <ul>
      {toDo?.map(el => 
      <>
        <ToDoList key={el.id} id={el.id} title={el.title} completed={el.completed} editToDo={() => handleEditToDo(el)} handleDelete={()=>fetchPort(el.id)}
     />
        {editToDo?.id === el.id && 
        <>
          <input type='text' onChange={handleChangeInput} value={editToDo.title}/> 
          <input type='checkbox' onChange={handleChangeCheck} checked={editToDo.completed}/>
          <button onClick={handleSaveEditToDo}>Save</button>
        </>
          }
{/* a */}
      </>
      )}
    </ul>
    </>
  )
}

export default App
