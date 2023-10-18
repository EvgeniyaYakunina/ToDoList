import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistType} from "./todolists-reducer";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type updateTaskActionType =  ReturnType<typeof updateTaskAC>

type ActionsType = RemoveTaskActionType| AddTaskActionType
    | updateTaskActionType
    | AddTodolistActionType |RemoveTodolistActionType
    |SetTodolistType |ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":{
            return {...state,[action.todolistId]: action.tasks}
        }
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach((td) => {
                stateCopy[td.id] = []
            })
            return stateCopy;
            // return {...state, action.todos.forEach((td)=> state[td.id] = [])}
        }
        case 'REMOVE-TASK':{
            return {...state,[action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskID)}
        }
        case "ADD-TASK":{
            // const newTask = {id: v1(), title: action.title, isDone: false};
            // return {...state,[action.todolistId]: [newTask,...state[action.todolistId]]}
            if(state[action.todolistId]?.length) {
                return {
                    ...state, [action.todolistId]: [action.task,...state[action.todolistId]]
                }
            }
            return {
                ...state, [action.todolistId]: [action.task]
            }
        }
        case 'UPDATE-TASK':{
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskID ? {...t, ...action.model}: t)}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]:[]}
        }
        case 'REMOVE-TODOLIST':{
            const {[action.id]:  [], ...rest} = state
            return rest
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistId: string) =>{
    return {type: 'REMOVE-TASK',  taskID, todolistId} as const
}
export const addTaskAC = (task: TaskType, todolistId: string) =>{
    return {type: 'ADD-TASK', task, todolistId} as const
}
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todolistId: string) =>{
    return {type: 'UPDATE-TASK', taskID, model, todolistId} as const
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}


export const getTaskTC =(todolistId:string)=> (dispatch: Dispatch, getState: any, extrArg: any)=>{
    todolistsAPI.getTasks(todolistId)
        .then((res)=>{
            // res.data
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const deleteTaskTC =(todolistId:string, taskID: string)=> (dispatch: Dispatch)=>{
    todolistsAPI.deleteTask(todolistId,taskID)
        .then((res)=>{
            // res.data
            dispatch(removeTaskAC(taskID,todolistId))
        })
}
export const createTaskTC =(todolistId:string, title: string)=> (dispatch: Dispatch)=>{
    todolistsAPI.createTask(todolistId,title)
        .then((res)=>{
            dispatch(addTaskAC(res.data.data.item, todolistId))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC =(todolistId:string,taskID: string, domainModel: UpdateDomainTaskModelType)=> (dispatch: Dispatch, getState:()=> AppRootStateType)=>{
    const task = getState().tasks[todolistId].find(t => t.id === taskID)
    if(task) {
        const apiModel: UpdateTaskModelType = {
            title: task!.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskID, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskID, domainModel, todolistId))
            })
    }
}