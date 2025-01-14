

import {configureStore} from '@reduxjs/toolkit'

import {rootReducers} from '../reducers/reducers'

export default configureStore({
    reducer  : rootReducers
})