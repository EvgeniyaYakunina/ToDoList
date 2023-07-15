import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

type ActionsType =
    RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodolistActionType ={
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType ={
    type: 'ADD-TODOLIST',
    title: string
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
            return [...state,{
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        case 'CHANGE-TODOLIST-TITLE':
            // const todolist = state.find(tl=> tl.id === action.id );
            // if(todolist){
            //     todolist.title = action.title;
            // }
            return state.map(tl=> tl.id === action.id ? {...tl,title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            // let todoList = state.find(tl => tl.id === action.id);
            // if (todoList) {
            //     todoList.filter = action.filter;
            // }
            return state.map(tl => tl.id === action.id ? {...tl,filter: action.filter} : tl)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId1: string): RemoveTodolistActionType =>{
    return {type: 'REMOVE-TODOLIST', id: todolistId1}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType =>{
    return {type: 'ADD-TODOLIST', title: newTodolistTitle}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType =>{
    return {type: 'CHANGE-TODOLIST-TITLE' as const, id: id, title: title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType =>{
    return  {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}