import axios from "axios";
import useSWR from "swr";
import { ToDo } from "./models";


const useFetchToDo= ()=>{

 const fetcher=(url:string)=>axios.get(url).then((res)=> res.data)
 const{data,error,isLoading,mutate:refetchGetToDos}=useSWR<ToDo[]>("http://localhost:3000/api/todos",fetcher);
 

 return {data,error,isLoading, refetchGetToDos}

}

export default useFetchToDo