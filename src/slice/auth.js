import {createSlice} from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistance-storage";

const initialState = {
    isLoading: false,
    loggedIn: false,
    error:null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        // LOGIN and REGISTER
        authUserStart:(state)=>{
            state.isLoading=true
        },
        authUserSuccess:(state,action)=>{
            state.loggedIn=true
            state.isLoading=false
            state.user=action.payload
            setItem('token', action.payload.token)
        },
        authUserFailure:(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        },
        logoutUser:state=>{
            state.user=null
            state.loggedIn=false
        }
    }
})

export const {authUserStart,authUserFailure,authUserSuccess,logoutUser} = authSlice.actions

export default authSlice.reducer