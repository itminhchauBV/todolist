import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface TodoState{
    postId:number
}

const initialState: TodoState ={
    postId:0
}

const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        savePostId: (state, action:PayloadAction<number>)=>{
            state.postId = action.payload
        }
    }
})

const todoReducer = todoSlice.reducer
export const {savePostId} = todoSlice.actions

export default todoReducer