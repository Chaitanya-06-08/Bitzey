import { createSlice } from "@reduxjs/toolkit";
export const modalSlice=createSlice({
    name:'modal',
    initialState:false,
    reducers:{
        toggleModal(state){
            return !state
        }
    }
})
export const modalActions=modalSlice.actions