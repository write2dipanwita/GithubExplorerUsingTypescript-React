import { createSlice } from "@reduxjs/toolkit";

interface AuthState{
    isAuthenticated: boolean;
}

const initialState : AuthState = {
    isAuthenticated: false
};

const auth = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state)=>{
            state.isAuthenticated = true;

        },
        logout:(state)=>{
            state.isAuthenticated = false;

        }
    }
})
export const{login,logout} = auth.actions;
export default auth.reducer; 