import {todolistsAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";


export type RemoveTodolistActionType ={ type: 'REMOVE-TODOLIST', id: string}
export type AddTodolistActionType ={ type: 'ADD-TODOLIST', todolist: TodolistType}
export type ChangeTodolistTitleActionType ={ type: 'CHANGE-TODOLIST-TITLE', id: string, title: string }
export type ChangeTodolistFilterActionType ={ type: 'CHANGE-TODOLIST-FILTER', id: string, filter: FilterValuesType }
export type SetTodolistType= ReturnType<typeof setTodolistsAC>

export type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] =[]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOS":{
            return action.todos.map((el)=>({...el,filter: 'all'}))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl=> tl.id !== action.id)
        case 'ADD-TODOLIST':
            // return [{
            //     id: action.todolistId,
            //     title: action.title,
            //     filter: 'all',
            //     addedDate: '',
            //     order: 0
            // }, ...state]
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id === action.id ? {...tl,title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl,filter: action.filter} : tl)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType =>{
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType =>{
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType =>{
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType =>{
    return  {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistsAC = (todos: TodolistType[]) => ({type: 'SET-TODOS', todos} as const)

export const getTodoTC =()=> (dispatch: Dispatch, getState: any, extrArg: any)=>{
    todolistsAPI.getTodolists()
        .then((res)=>{
            // res.data
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodoTC =(todolistId: string)=> (dispatch: Dispatch, getState: any, extrArg: any)=>{
    todolistsAPI.deleteTodolist(todolistId)
        .then((res)=>{
            // res.data
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodoTC =(title: string)=> (dispatch: Dispatch, getState: any, extrArg: any)=>{
    todolistsAPI.createTodolist(title)
        .then((res)=>{
            // res.data
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodoTitleTC =(id: string, title: string)=> (dispatch: Dispatch, getState: any, extrArg: any)=>{
    todolistsAPI.updateTodolist(id, title)
        .then((res)=>{
            // res.data
            dispatch(changeTodolistTitleAC(id, title))
        })
}
// export const changeTodoFilterTC =(id: string, filter: FilterValuesType)=> (dispatch: Dispatch, getState: any, extrArg: any)=>{
//     todolistsAPI.updateTodolist(id, filter)
//         .then((res)=>{
//             // res.data
//             dispatch(changeTodolistFilterAC(id, filter))
//         })
// }