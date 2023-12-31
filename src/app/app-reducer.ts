import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {setIsLoggedInAC} from "../pages/Login/auth-reducer";

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType ) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean ) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initializeAppTC=()=>(dispatch: Dispatch)=>{
authAPI.me()
    .then(res=>{
        if (res.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))
        }else {

        }
        dispatch(setAppInitializedAC(true))
    })
}


const initialState: InitialStateType = {status: 'idle', error: null, isInitialized: false}
export type InitialStateType = {
    status: RequestStatusType
    error: string | null,
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    |SetAppInitializedActionType
