import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/api";


export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsAPI.getTodolists()
            .then((res)=>{
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle]= useState<string>('');

    const createTodolist=()=>{
        todolistsAPI.createTodolist(title)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"title"} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId]= useState<string>('');

    const deleteTodolist=()=>{
        todolistsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId]= useState<string>('');
    const [title, setTitle]= useState<string>('');

    const updateTodolist=()=>{
        todolistsAPI.updateTodolist(title, todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"title"} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={updateTodolist}>Update Todolist</button>
        </div>
    </div>
}



