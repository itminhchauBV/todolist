import './style.scss'
import imageDown from '../assets/image/down.png'
import imageDelete from '../assets/image/delete.png'
import imageEdit from '../assets/image/pencil.png'
import { useState } from 'react'
import { useGetPostsQuery } from './todo.service'
function TodoList() {
    const [showInput, setShowInput]= useState<Boolean>(false)

    const handleShowInput = () =>{
        setShowInput(!showInput)
    }

    const {data,isLoading,isFetching}= useGetPostsQuery()

    console.log(data);
    
    return <div className="container">
       <div className='wrap-todo'>
            <h1>TODO LIST</h1>
            <div className='btn'>
                <button className='btn-task' onClick={handleShowInput}>Add Task</button>
                <div className='dropdown'>
                    <span>All</span>
                    <img src={imageDown} alt="" />
                </div>
            </div>
            {showInput && 
             <div className='input'>
                <input type="text" className='input-add' placeholder='Enter task'/>
                <button className='btn-add'>add</button>
            </div>
            }
            
            <div className='content'>
                {data && data.map((item)=>{
                    return <div className='item' key={item.id}>
                    <span className="title">{item.title}</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
                })}
            
               
            </div>
       </div>
    </div>
}

export default TodoList