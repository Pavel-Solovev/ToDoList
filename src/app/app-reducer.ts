import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../helpers/error-helper";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialised: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case "APP/IS-INITIALISED":
            return {...state, isInitialised: action.payload.initialised}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            status
        }
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}

export const setAppInitialisedAC = (initialised: boolean) => {
    return {
        type: 'APP/IS-INITIALISED',
        payload: {
            initialised
        }
    } as const
}


export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setIsInitialisedACType = ReturnType<typeof setAppInitialisedAC>

export const initializeAppTC = (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(()=>{
            dispatch(setAppInitialisedAC(true))
        })
}


export type AppActionType = setAppStatusACType
    | setAppErrorACType
    | setIsInitialisedACType



