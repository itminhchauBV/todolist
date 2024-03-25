import { Post } from "../../todo.type";
import imageDelete from "../../../assets/image/delete.png";
import imageEdit from "../../../assets/image/pencil.png";
interface ItemTodoProps {
    item: Post
    handleDelete: (id: number) => void
    handleEdit: (post: Post) => void
    selectPosts: number[]
    setSelectPosts: React.Dispatch<React.SetStateAction<number[]>>
}

function ItemTodo({ item, handleDelete, handleEdit, selectPosts, setSelectPosts }: ItemTodoProps) {
    return (
        <div className="item" key={item.id}>
            <span className="title">{item.title}</span>
            <div className="btn-control">
                <img
                    src={imageDelete}
                    alt=""
                    onClick={() => handleDelete(item.id)}
                />
                <img
                    src={imageEdit}
                    alt=""
                    onClick={() => handleEdit(item)}
                />
                <input
                    type="checkbox"
                    checked={selectPosts.includes(item.id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectPosts([...selectPosts, item.id]);
                        } else {
                            setSelectPosts(selectPosts.filter((id) => id !== item.id));
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default ItemTodo