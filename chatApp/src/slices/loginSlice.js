
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem('token') || null
}

const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setToken : (state , action ) => {
            state.token = action.payload
            localStorage.setItem('token' , action.payload)
        } , 
        clearToken : (state , action ) => {
            state.token = null
            localStorage.removeItem('token' , action.payload)
        }
    }
})

export const {setToken , clearToken} = loginSlice.actions;
export default loginSlice.reducer