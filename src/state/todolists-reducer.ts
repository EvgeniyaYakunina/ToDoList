import {todolistsAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {handleServerNetworkError} from "../utils/error-utils";


const initialState: TodolistDomainType[] =[]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOS":
            return action.todos.map((el)=>({...el,filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl=> tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id === action.id ? {...tl,title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl,filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl,entityStatus: action.status} : tl)
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) =>({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodolistTitleAC = (id: string, title: string) =>({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType)=> ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)
export const setTodolistsAC = (todos: TodolistType[]) => ({type: 'SET-TODOS', todos} as const)

//thunks
export const getTodoTC =()=> (dispatch: ThunkDispatch, getState: any, extrArg: any)=>{
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res)=>{
            // res.data
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error=>{
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodoTC =(todolistId: string)=> (dispatch: ThunkDispatch, getState: any, extrArg: any)=>{
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res)=>{
            // res.data
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodoTC =(title: string)=> (dispatch: ThunkDispatch, getState: any, extrArg: any)=>{
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res)=>{
            // res.data
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const changeTodoTitleTC =(id: string, title: string)=> (dispatch: Dispatch<ActionsType>, getState: any, extrArg: any)=>{
    todolistsAPI.updateTodolist(id, title)
        .then((res)=>{
            // res.data
            dispatch(changeTodolistTitleAC(id, title))
        })
}

//types
export type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>