import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import React from 'react';
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState = {
// const initialGlobalState: CombinedState<{ todolists: TodolistDomainType[]; tasks: TasksStateType; }> = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', order: 0, addedDate: ""},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'idle', order: 0, addedDate: ""}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todoListId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.New, todoListId: "todoListId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New, todoListId: "todoListId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todoListId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    } ,
    app: {
        error: null,
        status: 'loading',
        isInitialized: false
    },
    auth:{
        isLoggedIn: false
    }
}as AppRootStateType;

export const storyBookStore = legacy_createStore
(rootReducer, initialGlobalState , applyMiddleware(thunk));

// export const  ReduxStoreProviderDecoration = (storyFn:()=>React.ReactNode)=>{
//     return <Provider store={storyBookStore}>{storyFn()}</Provider>
// }
export const  ReduxStoreProviderDecoration = (storyFn:any)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}