import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenState } from "../Types";



const initialState : TokenState = {
    token : {token:''},
    isValid : false,
    error:null,
}

const TokenSlice = createSlice({
    name :'token',
    initialState,
    reducers : {
        setToken(state,action:PayloadAction<string>){
            if(state.token)
            state.token.token = action.payload;
        },
       
        validateToken(state,action:PayloadAction<string>){
            
        },
        validateTokenSuccess(state,action:PayloadAction<{token : string}>){
            state.token = action.payload;
            state.isValid=true;
            state.error=null;

        },
        validateTokenFailure(state,action:PayloadAction<string>){
            state.isValid=false;
            //state.error=action.payload;
            state.error="The token you provided is invalid. Pleaae follow these instructions to generate a new token.";

        },
        resetError(state) {
            state.error = null;
            state.isValid = false;  
        },
        clearToken(state){
            state.token =null;
            state.isValid = false;
        }

    }

})

export const {setToken,validateToken,validateTokenSuccess,validateTokenFailure,resetError,clearToken} = TokenSlice.actions;
export default TokenSlice.reducer;