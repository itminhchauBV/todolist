import { useState } from 'react'
import imageDelete from '../assets/image/delete.png'
import imageEdit from '../assets/image/pencil.png'
import './style.scss'
import { useAddPostMutation, useDeletePostMutation, useGetPostsQuery, useUpdatePostMutation } from './todo.service'
import { Post } from './todo.type'

const initialState: Omit<Post, 'id'> = {
    userId: 1,
    title: '',
    body: 'testbody'
}

function TodoList() {
    const [showInput, setShowInput] = useState<Boolean>(false)
    const [formData, setFormData] = useState<Omit<Post, 'id'> | Post>(initialState)
    const [modeEdit, setModeEdit] = useState<Boolean>(false)
    const [editPostId, setEditPostId] = useState<number>(0)

    const handleShowInput = () => {
        setShowInput(true)
        setFormData(initialState)
        setModeEdit(false)
    }

    const { data, isLoading, isFetching } = useGetPostsQuery("posts")

    const [addPost, addPostResult] = useAddPostMutation()

    const [updatePost, updatePostResult] = useUpdatePostMutation()

    const [deletePost, deletePostResult] = useDeletePostMutation()

    const handlOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => (
            {
                ...prev,
                title: e.target.value
            }
        ))
    }

    const handleEdit = (post: Post) => {
        setModeEdit(true)
        setShowInput(true)
        setFormData(post)
        setEditPostId(post.id)

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!modeEdit) {
            const result = await addPost(formData).unwrap()
            console.log("you create post succes:", result)
        } else {

            const result = await updatePost({
                body: formData,
                id: editPostId
            }).unwrap()

            console.log(result);

        }

        setFormData(initialState)

    }

    const handleDelete = (id: number) => {

        deletePost(id)
    }


    return <div className="container">
        <div className='wrap-todo'>
            <h1>TODO LIST</h1>
            <div className='btn'>
                <button className='btn-task' onClick={handleShowInput}>Add Task</button>

            </div>
            {showInput &&
                <form className='input' onSubmit={handleSubmit}>
                    <input type="text" className='input-add' value={formData.title} placeholder='Enter task' onChange={handlOnchange} required />
                    <button className='btn-add' type='submit' >{modeEdit ? "edit" : "add"}</button>
                </form>
            }

            <div className='content'>
                {data && data.map((item) => {
                    return <div className='item' key={item.id}>
                        <span className="title">{item.title}</span>
                        <div className='btn-control'>
                            <img src={imageDelete} alt="" onClick={() => handleDelete(item.id)} />
                            <img src={imageEdit} alt="" onClick={() => handleEdit(item)} />
                        </div>
                    </div>
                })}


            </div>
        </div>
    </div>
}

export default TodoList