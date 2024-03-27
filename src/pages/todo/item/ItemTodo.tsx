import imageDelete from '../../../assets/image/delete.png'
import imageEdit from '../../../assets/image/pencil.png'
import { Post } from '../../todo.type'
interface ItemTodoProps {
  item: Post
  handleClickDelete: (id: number) => void
  handleEdit: (post: Post) => void
  selectPosts: number[]
  setSelectPosts: React.Dispatch<React.SetStateAction<number[]>>
  idChecked: number
}

function ItemTodo({ item, handleClickDelete, handleEdit, selectPosts, setSelectPosts, idChecked }: ItemTodoProps) {
  return (
    <div className={idChecked === item.id ? 'item disable' : 'item'} key={item.id}>
      <span className="title">{item.title}</span>
      <div className="btn-control">
        <img src={imageDelete} alt="" onClick={() => handleClickDelete(item.id)} />
        <img src={imageEdit} alt="" onClick={() => handleEdit(item)} />
        <input
          type="checkbox"
          checked={selectPosts.includes(item.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectPosts([...selectPosts, item.id])
            } else {
              setSelectPosts(selectPosts.filter((id) => id !== item.id))
            }
          }}
        />
      </div>
    </div>
  )
}

export default ItemTodo
