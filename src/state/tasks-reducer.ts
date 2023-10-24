import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state,[action.todolistId]: action.tasks}
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach((td) => {
                stateCopy[td.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK':
            return {...state,[action.todolistId]: state[action.todolistId].filter(t=> t.id !== action.taskID)}
        case "ADD-TASK":
            return {...state,[action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskID ? {...t, ...action.model}: t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]:[]}
        case 'REMOVE-TODOLIST':
            const {[action.id]:  [], ...rest} = state
            return rest
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskID: string, todolistId: string) => ({type: 'REMOVE-TASK',  taskID, todolistId} as const)
export const addTaskAC = (task: TaskType, todolistId: string) =>({type: 'ADD-TASK', task, todolistId} as const)
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todolistId: string) =>({type: 'UPDATE-TASK', taskID, model, todolistId} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const getTaskTC =(todolistId:string)=> (dispatch: Dispatch<ActionsType | SetAppStatusActionType>, getState: any, extrArg: any)=>{
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res)=>{
            const task = res.data.items
            dispatch(setTasksAC(task, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTaskTC =(todolistId:string, taskID: string)=> (dispatch: Dispatch<ActionsType>)=>{
    todolistsAPI.deleteTask(todolistId,taskID)
        .then((res)=>{
            // res.data
            dispatch(removeTaskAC(taskID,todolistId))
        })
}
export const createTaskTC =(todolistId:string, title: string)=> (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>)=>{
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId,title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
                // if (res.data.messages.length) {
                //     dispatch(setAppErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setAppErrorAC('Some error occurred'))
                // }
                // dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch);
            // dispatch(setAppErrorAC(error.message))
            // dispatch(setAppStatusAC('failed'))
        })
}
export const updateTaskTC =(todolistId:string,taskID: string, domainModel: UpdateDomainTaskModelType)=> (dispatch: ThunkDispatch, getState:()=> AppRootStateType)=>{
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
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskID, domainModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                    // if (res.data.messages.length) {
                    //     dispatch(setAppErrorAC(res.data.messages[0]))
                    // } else {
                    //     dispatch(setAppErrorAC('Some error occurred'))
                    // }
                    // dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((error)=>{
                handleServerNetworkError(error, dispatch);
                // dispatch(setAppErrorAC(error.message))
                // dispatch(setAppStatusAC('failed'))
            })
    }
}

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    |ReturnType<typeof removeTaskAC>
    |ReturnType<typeof addTaskAC>
    |ReturnType<typeof updateTaskAC>
    |ReturnType<typeof removeTodolistAC>
    |ReturnType<typeof addTodolistAC>
    |ReturnType<typeof setTodolistsAC>
    |ReturnType<typeof setTasksAC>

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>