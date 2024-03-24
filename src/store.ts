import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './pages/todo.slice'
import {todoApi} from './pages/todo.service'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer
  },
  // them api middleware de enable cac tinh nang nhu cahing, invalidation, polling cua rtk-query
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(todoApi.middleware)
  },
})

// optional, nhung bat buoc neu dung tinh nang refechOnfocus/refetchonreconnect

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch