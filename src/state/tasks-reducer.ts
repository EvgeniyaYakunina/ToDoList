import {FilterValuesType, TasksStateType, TodoListsType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType =  ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType =  ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType| AddTaskActionType | ChangeTaskStatusActionType |ChangeTaskTitleActionType
| AddTodolistActionType |RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            return {...state,[action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskID)}
        }
        case "ADD-TASK":{
            const newTask = {id: v1(), title: action.title, isDone: false};
            return {...state,[action.todolistId]: [newTask,...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskID ? {...t,isDone: action.isDone}: t)}
        }
        case 'CHANGE-TASK-TITLE':{
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskID ? {...t,title: action.title}: t)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]:[]}
        }
        case 'REMOVE-TODOLIST':{
            const {[action.id]: [], ...rest} = state
            return rest
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const removeTaskAC = (taskID: string, todolistId: string) =>{
    return {type: 'REMOVE-TASK', todolistId, taskID} as const
}
export const addTaskAC = (title: string, todolistId: string) =>{
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) =>{
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string) =>{
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistId} as const
}
