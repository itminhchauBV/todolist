import { useEffect, useState } from "react";
import ModalLoading from "../../components/ModalLoading";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../todo.service";
import { Post } from "../todo.type";
import ItemTodo from "./item/ItemTodo";
import "./style.scss";

const initialState: Omit<Post, "id"> = {
  userId: 1,
  title: "",
  body: "testbody",
};

function TodoList() {
  const [showInput, setShowInput] = useState<Boolean>(false);
  const [formData, setFormData] = useState<Omit<Post, "id"> | Post>(
    initialState
  );
  const [modeEdit, setModeEdit] = useState<Boolean>(false);
  const [editPostId, setEditPostId] = useState<number>(0);
  const [selectPosts, setSelectPosts] = useState<number[]>([]);
  const [listPost, setListPost] = useState<Post[]>([]);

  const handleShowInput = () => {
    setShowInput(true);
    setFormData(initialState);
    setModeEdit(false);
  };

  const { data, isLoading, isFetching } = useGetPostsQuery("posts");
  const [addPost, addPostResult] = useAddPostMutation();
  const [updatePost, updatePostResult] = useUpdatePostMutation();
  const [deletePost, deletePostResult] = useDeletePostMutation();

  const handlOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleEdit = (post: Post) => {
    setModeEdit(true);
    setShowInput(true);
    setFormData(post);
    setEditPostId(post.id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modeEdit) {
      const result = await addPost(formData).unwrap();
    } else {
      const newListPost = listPost.map((post, index) => {
        if (post.id === editPostId) {
          const newFormData = {
            id: editPostId,
            ...formData,
          };
          post = newFormData;
        }
        return post;
      });

      setListPost(newListPost);

      updatePost({
        body: formData,
        id: editPostId,
      })
        .unwrap()
        .then(() => {
          // Xử lý khi edit thành công
          console.log("Products deleted successfully.");
        })
        .catch((error) => {
          // Xử lý khi edit thất bại
          if (data) {
            setListPost(data);
          }

          console.error("Error deleting products:", error);
        });
    }
    setFormData(initialState);
  };

  const handleDelete = (id: number) => {
    const newListPost = listPost.filter((item) => item.id !== id);
    setListPost(newListPost);
    deletePost(id);
    console.log("status", deletePostResult);
    if (!deletePostResult.isSuccess) {
      if (data) {
        setListPost(data);
      }
    }
  };

  const handleDeletMultiple = () => {
    for (const id of selectPosts) {
      deletePost(id)
        .unwrap()
        .then(() => {
          // Xử lý khi xóa thành công
          console.log("Products deleted successfully.", id);
        })
        .catch((error) => {
          // Xử lý khi xóa thất bại
          if (data) {
            setListPost(data);
          }

          console.error("Error deleting products:", error);
        });
    }
    setSelectPosts([]);
  };

  useEffect(() => {
    if (data) {
      setListPost(data);
    }
  }, [data]);

  return (
    <div className="container">
      <div className="wrap-todo">
        <h1>TODO LIST</h1>
        <div className="btn">
          <button className="btn-task" onClick={handleShowInput}>
            Add Task
          </button>
          <div>
            <button onClick={handleDeletMultiple} className="delete-multiple">
              Delete
            </button>
          </div>
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
              {modeEdit ? "edit" : "add"}
            </button>
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
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    selectPosts={selectPosts}
                    setSelectPosts={setSelectPosts}
                  />
                </>
              );
            })}
        </div>
        {deletePostResult && deletePostResult.isLoading && (
          <ModalLoading title="Deleting" />
        )}
        {updatePostResult && updatePostResult.isLoading && (
          <ModalLoading title="Updating" />
        )}
        {addPostResult && addPostResult.isLoading && (
          <ModalLoading title="Adding" />
        )}
      </div>
    </div>
  );
}

export default TodoList;
