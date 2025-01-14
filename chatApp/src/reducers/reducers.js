
import { combineReducers } from "@reduxjs/toolkit";
import loginReducers from "../slices/loginSlice";

export const rootReducers = combineReducers({
    loginReducers : loginReducers
})

