import {createSlice} from '@reduxjs/toolkit'

export const loadingSlice=createSlice({
    name : 'loading',
    initialState : false,
    reducers:{
        toggleLoading(state){
            return !state
        }
    }
})

export const loadingActions=loadingSlice.actions 