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

export const todolistsReducer = (state: TodoListsType[], action: ActionsType): TodoListsType[] => {
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
            throw new Error('I don\'t understand this type')
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