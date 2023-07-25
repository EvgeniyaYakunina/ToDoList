import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType ={
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType ={
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType ={
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType ={
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export let todoListId1 = v1();
export let todoListId2 = v1();

const initialState: TodoListsType[] =[
    {id: todoListId1, title: "What to watch", filter: "active"},
    {id: todoListId2, title: "What to buy", filter: "completed"}
]

export const todolistsReducer = (state: TodoListsType[] = initialState, action: ActionsType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=> tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'},...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id === action.id ? {...tl,title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl,filter: action.filter} : tl)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId1: string): RemoveTodolistActionType =>{
    return {type: 'REMOVE-TODOLIST', id: todolistId1}
}
export const addTodolistAC = (title: string): AddTodolistActionType =>{
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType =>{
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType =>{
    return  {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}