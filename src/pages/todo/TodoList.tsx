import { useCallback, useEffect, useState } from "react";
import ModalLoading from "../../components/modalLoading/ModalLoading";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "../todo.service";
import { Post } from "../todo.type";
import ItemTodo from "./item/ItemTodo";
import "./style.scss";
import ModalConfirm from "../../components/modalConfirm/ModalConfirm";

const initialState: Omit<Post, "id"> = {
  title: "",
  body: "testbody",
};

function TodoList() {
  const [showInput, setShowInput] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<Post, "id"> | Post>(
    initialState
  );
  const [modeEdit, setModeEdit] = useState<boolean>(false);
  const [editPostId, setEditPostId] = useState<number>(0);
  const [deletePostId, setDeletePostId] = useState<number>(0);
  const [selectPosts, setSelectPosts] = useState<number[]>([]);
  const [listPost, setListPost] = useState<Post[]>([]);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [checkDeleteMultiple, setCheckDeleteMultiple] =
    useState<boolean>(false);
  //   const [isDelete, setIsDelete] = useState<boolean>(false);
  const handleShowInput = () => {
    setShowInput(true);
    setFormData(initialState);
    setModeEdit(false);
    setEditPostId(0);
  };

  const { data, isLoading, isFetching, isSuccess } = useGetPostsQuery("posts");
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
    // setIsDelete(false);
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
      setEditPostId(0);
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

  const handleClickDelete = (id: number) => {
    setShowModalDelete(true);
    setDeletePostId(id);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    if (checkDeleteMultiple) {
      handleDeletMultiple();
    } else {
      const newListPost = listPost.filter((item) => item.id !== deletePostId);
      setListPost(newListPost);
      deletePost(deletePostId)
        .unwrap()
        .then(() => {
          console.log("da xoa thanh cong");

          setIsDeleting(false);
        })
        .catch(() => {
          if (data) {
            setListPost(data);
          }
        });
      // if (!deletePostResult.isSuccess) {
      //   if (data) {
      //     setListPost(data);
      //   }
      // }
      setShowModalDelete(false);
      setDeletePostId(0);
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
    setShowModalDelete(false);
    setCheckDeleteMultiple(false);
  };

  const handleClickDeleteMultiple = () => {
    setShowModalDelete(true);
    setCheckDeleteMultiple(true);
  };

  const handleCancelModalDelete = () => {
    setShowModalDelete(false);
    setCheckDeleteMultiple(false);
    setDeletePostId(0);
    // setIsDelete(false);
  };

  useEffect(() => {
    console.log("check isdeleting", isDeleting);
    console.log("check issucces", isSuccess);

    if (!isDeleting && isSuccess) {
      console.log("goi api");

      // Gọi API post
      setListPost(data);
    }
    // if (data) {
    //   setListPost(data);
    //   console.log("da goi");
    // }
  }, [data, isDeleting, isSuccess]);

  return (
    <div className="container">
      <div className="wrap-todo">
        <h1>TODO LIST</h1>
        <div className="btn">
          <button className="btn-task" onClick={handleShowInput}>
            Add Task
          </button>
          <div>
            <button
              onClick={handleClickDeleteMultiple}
              className="delete-multiple"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="check-all">
          <span>choose all</span>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                const idPosts = listPost.map((post) => post.id);
                setSelectPosts(idPosts);
              } else {
                setSelectPosts([]);
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
              {modeEdit ? "edit" : "add"}
            </button>
            {modeEdit && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setFormData(initialState);
                  setEditPostId(0);
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
        {showModalDelete && (
          <ModalConfirm
            handleDelete={handleDelete}
            handleCancelModalDelete={handleCancelModalDelete}
          />
        )}
      </div>
    </div>
  );
}

export default TodoList;
