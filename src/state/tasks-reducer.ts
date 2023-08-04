import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todoListId1, todoListId2} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType =  ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType =  ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType| AddTaskActionType | ChangeTaskStatusActionType
                    |ChangeTaskTitleActionType | AddTodolistActionType |RemoveTodolistActionType;

const initialState: TasksStateType = {
        [todoListId1]: [
            {id: v1(), title: "Friends", isDone: true},
            {id: v1(), title: "Ted Lasso", isDone: true},
            {id: v1(), title: "Mandalorian", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Pizza", isDone: true},
            {id: v1(), title: "Cola", isDone: false}
        ]
    }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string) =>{
    return {type: 'REMOVE-TASK',  taskID, todolistId} as const
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
