import { createSlice } from "@reduxjs/toolkit"

interface TodoState{
    todoId:string
}

const initialState: TodoState ={
    todoId:''
}

const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{}
})

const todoReducer = todoSlice.reducer

export default todoReducer