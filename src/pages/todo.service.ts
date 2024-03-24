import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Post } from './todo.type'

export const todoApi = createApi({
    reducerPath: 'blogAppi',
    baseQuery: fetchBaseQuery({baseUrl:'https://jsonplaceholder.typicode.com/'}),
    endpoints: build =>({
        getPosts: build.query<Post[],void>({
            query:()=>'posts' // method khong co argument
        })
    })
})

export const {useGetPostsQuery} = todoApi