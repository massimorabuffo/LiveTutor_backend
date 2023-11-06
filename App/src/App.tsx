import { useState } from 'react'
import './App.css'
import InputForm from './InputForm'
import ToDoList from './ToDoList'
import { ToDo } from './models'

const elements: ToDo[] = [{id: 1, title: 'todo_1'}, {id: 2, title: 'todo_2', completed: false}]

function App() {
  const [toDo, setToDo] = useState<ToDo[]>(elements);

  return (
    <>
    <InputForm handleSubmit={(e) => console.log(e)}/>
    <ul>
      {toDo.map(el => <ToDoList key={el.id} title={el.title} completed={el.completed}/>)}
    </ul>
    </>
  )
}

export default App
