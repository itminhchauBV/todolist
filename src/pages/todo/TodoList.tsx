import { useEffect, useRef, useState } from 'react'
import ModalConfirm from '../../components/modalConfirm/ModalConfirm'
import ModalLoading from '../../components/modalLoading/ModalLoading'
import {
  useAddPostMutation,
  useDeleteMultipleMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '../todo.service'
import { Post } from '../todo.type'
import ItemTodo from './item/ItemTodo'
import './style.scss'

const initialState: Omit<Post, 'id'> = {
  title: '',
  body: 'testbody',
}

function TodoList() {
  const dataRef = useRef<Post[]>()
  const [chooseAll, setChooseAll] = useState<boolean>(false)
  const [showInput, setShowInput] = useState<boolean>(false)
  const [formData, setFormData] = useState<Omit<Post, 'id'> | Post>(initialState)
  const [modeEdit, setModeEdit] = useState<boolean>(false)
  const [editPostId, setEditPostId] = useState<number>(0)
  const [deletePostId, setDeletePostId] = useState<number>(0)
  const [selectPosts, setSelectPosts] = useState<number[]>([])
  const [listPost, setListPost] = useState<Post[]>([])
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
  const [checkDeleteMultiple, setCheckDeleteMultiple] = useState<boolean>(false)

  const { data } = useGetPostsQuery('posts')
  const [addPost, addPostResult] = useAddPostMutation()
  const [updatePost, updatePostResult] = useUpdatePostMutation()
  const [deletePost, deletePostResult] = useDeletePostMutation()
  const [deleteMultiplePost, deleteMultiplePostResult] = useDeleteMultipleMutation()

  // show input add task
  const handleShowInput = () => {
    setShowInput(true)
    setFormData(initialState)
    setModeEdit(false)
    setEditPostId(0)
  }

  // onchange input add task
  const handlOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  }

  // handle set states edit
  const handleEdit = (post: Post) => {
    setModeEdit(true)
    setShowInput(true)
    setFormData(post)
    setEditPostId(post.id)
  }

  // handle submit of add and edit taskk
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!modeEdit) {
      addPost(formData)
    } else {
      const newListPost = listPost.map((post, index) => {
        if (post.id === editPostId) {
          const newFormData = {
            id: editPostId,
            ...formData,
          }
          post = newFormData
        }
        return post
      })
      setListPost(newListPost)
      setEditPostId(0)
      updatePost({
        body: formData,
        id: editPostId,
      })
        .unwrap()
        .then(() => {
          console.log('Products deleted successfully.')
        })
        .catch((error) => {
          if (data) {
            setListPost(data)
          }
          console.error('Error deleting products:', error)
        })
    }
    setFormData(initialState)
  }

  // when click item show modal and set state id item in DeletePostId
  const handleClickDelete = (id: number) => {
    setShowModalDelete(true)
    setDeletePostId(id)
  }

  // handle delete post
  const handleDelete = () => {
    if (checkDeleteMultiple) {
      handleDeletMultiple()
    } else {
      const newListPost = listPost.filter((item) => item.id !== deletePostId)
      setListPost(newListPost)
      dataRef.current = newListPost
      deletePost(deletePostId)
        .unwrap()
        .then(() => {})
        .catch(() => {
          if (data) {
            setListPost(data)
          }
        })
      setShowModalDelete(false)
      setDeletePostId(0)
    }
  }

  // handle delete multiple post
  const handleDeletMultiple = () => {
    const newListPost = listPost.filter((item) => !selectPosts.includes(item.id))
    setListPost(newListPost)
    dataRef.current = newListPost
    deleteMultiplePost(selectPosts)
      .unwrap()
      .then(() => {
        setChooseAll(false)
        setSelectPosts([])
        setCheckDeleteMultiple(false)
      })
      .catch(() => {
        if (data) {
          setListPost(data)
        }
      })
    setShowModalDelete(false)
  }

  // when click button delete all
  const handleClickDeleteMultiple = () => {
    setShowModalDelete(true)
    setCheckDeleteMultiple(true)
  }

  // cancle modal confirm delete
  const handleCancelModalDelete = () => {
    setShowModalDelete(false)
    setCheckDeleteMultiple(false)
    setDeletePostId(0)
  }

  useEffect(() => {
    if (data && dataRef.current?.length !== data.length) {
      setListPost(data)
    }
  }, [data, dataRef])

  return (
    <div className="container">
      <div className="wrap-todo">
        <h1>TODO LIST</h1>
        <div className="btn">
          <button className="btn-task" onClick={handleShowInput}>
            Add Task
          </button>
          <div>
            <button onClick={handleClickDeleteMultiple} className="delete-multiple">
              Delete
            </button>
          </div>
        </div>
        <div className="check-all">
          <span>choose all</span>
          <input
            type="checkbox"
            checked={chooseAll}
            onChange={(e) => {
              if (e.target.checked) {
                const idPosts = listPost.map((post) => post.id)
                setSelectPosts(idPosts)
                setChooseAll(true)
              } else {
                setSelectPosts([])
                setChooseAll(false)
              }
            }}
          />
        </div>
        {showInput && (
          <form className="input" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-add"
              value={formData.title}
              placeholder="Enter task"
              onChange={handlOnchange}
              required
            />

            <button className="btn-add" type="submit">
              {modeEdit ? 'edit' : 'add'}
            </button>
            {modeEdit && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setFormData(initialState)
                  setEditPostId(0)
                  setModeEdit(false)
                }}
              >
                Cancel
              </button>
            )}
          </form>
        )}

        <div className="content">
          {listPost &&
            listPost.map((item) => {
              return (
                <>
                  <ItemTodo
                    key={item.id}
                    item={item}
                    handleClickDelete={handleClickDelete}
                    handleEdit={handleEdit}
                    selectPosts={selectPosts}
                    setSelectPosts={setSelectPosts}
                    idChecked={editPostId}
                  />
                </>
              )
            })}
        </div>
        {deletePostResult && deletePostResult.isLoading && <ModalLoading title="Deleting" />}
        {deleteMultiplePostResult && deleteMultiplePostResult.isLoading && <ModalLoading title="Deleting" />}
        {updatePostResult && updatePostResult.isLoading && <ModalLoading title="Updating" />}
        {addPostResult && addPostResult.isLoading && <ModalLoading title="Adding" />}
        {showModalDelete && (
          <ModalConfirm handleDelete={handleDelete} handleCancelModalDelete={handleCancelModalDelete} />
        )}
      </div>
    </div>
  )
}

export default TodoList
