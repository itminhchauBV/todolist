import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './todo.type'

export const todoApi = createApi({
    reducerPath: 'blogAppi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: build => ({
        getPosts: build.query<Post[], string>({
            query: (endPoint) => {
                return {
                    url: `${endPoint}`,
                    method: 'GET'
                }
            }, // method khong co argument
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result.map(({ id }) => ({
                            type: 'Posts' as const, id
                        })),
                        { type: 'Posts' as const, id: 'LIST' }
                    ]
                    return final
                }
                const final = [{ type: 'Posts' as const, id: 'LIST' }]
                return final
            }
        }),
        /* chung ta dung mutation doi voi cac truong hop POST, PUT, DELETE
        Post la reponse tra ve va Omit<Post, 'id'> la body gui len
    */
        addPost: build.mutation<Post, Omit<Post, 'id'>>({
            query: (body) => {
                return {
                    url: 'posts',
                    method: 'POST',
                    body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            invalidatesTags: (result, error, body) => [{ type: "Posts", id: 'LIST' }]
        }),

        updatePost: build.mutation<Post, { id: number, body: Omit<Post, 'id'> }>({
            query: (data) => {
                return {
                    url: `posts/${data.id}`,
                    method: 'PUT',
                    body: data.body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            invalidatesTags: (result, error, data) => [{ type: "Posts", id: data.id }]
        }),

        deletePost: build.mutation<{}, number>({
            query: (id) => {
                return {
                    url: `posts/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            },
            invalidatesTags: (result, error, id) => [{ type: "Posts", id: id }]
        })
    }),





})

export const { useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } = todoApi