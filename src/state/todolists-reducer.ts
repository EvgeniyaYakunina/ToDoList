import {todolistsAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, SetStatusActionType} from "../app/app-reducer";


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
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) =>({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodolistTitleAC = (id: string, title: string) =>({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todos: TodolistType[]) => ({type: 'SET-TODOS', todos} as const)

//thunks
export const getTodoTC =()=> (dispatch: Dispatch<ActionsType>, getState: any, extrArg: any)=>{
    todolistsAPI.getTodolists()
        .then((res)=>{
            // res.data
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodoTC =(todolistId: string)=> (dispatch: Dispatch<ActionsType | SetStatusActionType>, getState: any, extrArg: any)=>{
    dispatch(setStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res)=>{
            // res.data
            dispatch(removeTodolistAC(todolistId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const addTodoTC =(title: string)=> (dispatch: ThunkDispatch, getState: any, extrArg: any)=>{
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res)=>{
            // res.data
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
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

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsType | SetStatusActionType>