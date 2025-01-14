
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : null
}

const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        setToken : (state , action ) => {
            state.token = action.payload
        }
    }
})

export const {setToken} = loginSlice.actions;
export default loginSlice.reducer