import { createSlice } from "@reduxjs/toolkit";
export const modalSlice=createSlice({
    name:'modal',
    initialState:'',
    reducers:{
        toggleModal(state,action){
            return action.payload
        }
    }
})
export const modalActions=modalSlice.actions