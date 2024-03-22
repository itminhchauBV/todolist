import './style.scss'
import imageDown from '../assets/image/down.png'
import imageDelete from '../assets/image/delete.png'
import imageEdit from '../assets/image/pencil.png'
import { useState } from 'react'
function TodoList() {
    const [showInput, setShowInput]= useState<Boolean>(false)

    const handleShowInput = () =>{
        setShowInput(!showInput)
    }
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
                <div className='item'>
                    <span className="title">todo 1234567</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
                <div className='item'>
                    <span className="title">todo 1234567</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
                <div className='item'>
                    <span className="title">todo 1234567</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
                <div className='item'>
                    <span className="title">todo 1234567</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
                <div className='item'>
                    <span className="title">todo 1234567</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
                <div className='item'>
                    <span className="title">todo 1234567</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
                <div className='item'>
                    <span className="title">todo 1234567</span>
                    <div className='btn-control'>
                        <img src={imageDelete} alt="" />
                        <img src={imageEdit} alt="" />
                    </div>
                </div>
            </div>
       </div>
    </div>
}

export default TodoList