import {FilterValuesType, TasksStateType, TodoListsType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType ={
    type: 'REMOVE-TASK'
    todolistId: string
    taskID: string
}
export type AddTaskActionType ={
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType| AddTaskActionType | ChangeTaskStatusActionType |ChangeTaskTitleActionType
| AddTodolistActionType |RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            // const stateCopy = {...state};
            // const tasks = state[action.todolistId];
            // const filteredTasks = tasks.filter(t=> t.id !== action.taskID);
            // stateCopy[action.todolistId] = filteredTasks;
            // return stateCopy;
            return {...state,[action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskID)}
        }
        case "ADD-TASK":{
            // const stateCopy = {...state};
            // const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            // const newTasks = [newTask,...tasks];
            // stateCopy[action.todolistId] = newTasks
            // return stateCopy
            return {...state,[action.todolistId]: [newTask,...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskID ? {...t,isDone: action.isDone}: t)}
        }
        case 'CHANGE-TASK-TITLE':{
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskID ? {...t,title: action.title}: t)}
        }
        case 'ADD-TODOLIST': {
            return {[action.todolistId]:[],...state}
        }
        case 'REMOVE-TODOLIST':{
            return {delete: state[action.id]}
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskActionType =>{
    return {type: 'REMOVE-TASK', todolistId, taskID}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType =>{
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType =>{
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistId}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): ChangeTaskTitleActionType =>{
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistId}
}
