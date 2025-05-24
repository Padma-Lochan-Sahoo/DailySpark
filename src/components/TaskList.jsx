import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleComplete,editTasks,deleteTasks,setSearchFilter,setStatusFilter } from '../features/tasks/taskSlice'

const TaskList = () => {
    const {tasks,filter} = useSelector((state) => state.tasks)
    const dispatch = useDispatch()
    const [editId,setEditId] = useState(null)
    const [editText,setEditText] = useState("")

    const handleEdit = (id, text) => {
            setEditId(id)
            setEditText(text)
    }
    const handleEditSave = (id, text) => {
        if (text.trim() === "") {
            alert("Task text cannot be empty")
            return
        }
        dispatch(editTasks({id, newText: text}))
        setEditId(null)
        setEditText("")
    }

    const filteredTasks = tasks.filter(task => {
        if(filter.status == "completed"){
            return task.completed
        }
        if(filter.status == "pending"){
            return !task.completed
        }
        return true
    }).filter(task => task.text.toLowerCase().includes(filter.search.toLowerCase()))
  return (
    <div >
        {/* search task */}
        <input type="text" placeholder='search task...' 
        value={filter.search} 
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
        className='border rounded mb-4 w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />

        {/* Filter Tasks */}
        <div className='flex gap-4 mb-4'>
            {
                ["all", "completed", "pending"].map((status) => (
                    <button 
                        key={status} 
                        onClick={() => dispatch(setStatusFilter(status))}
                        className={`px-5 py-2 rounded border focus:outline-none ${filter.status === status ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))
            }
        </div>



        {/* Display Tasks  */}
        <ul className='space-y-2'>
            {filteredTasks.length === 0 && <p>No Tasks found</p>}
            {filteredTasks.map((task) => (
                <li key={task.id} className='flex items-center justify-between border p-2 rounded '>
                    <div className='flex items-center gap-2'>
                        <input 
                        type='checkbox'
                        checked={task.completed}
                        onChange={(e) => {dispatch(toggleComplete(task.id))}}
                        className='border rounded px-2 mr-2 cursor-pointer'
                        
                        />
                        {
                            editId === task.id ? (
                                <input type='text' value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className='border rounded px-2 '
                                />
                            ): (<span className={task.completed ? 'line-through text-gray-500':""}>{task.text}</span>)
                        }
                        
                    </div>
                    <div>
                        {
                            editId === task.id ? (
                                <button
                                    className='text-white cursor-pointer bg-green-400 px-2 py-1 rounded hover:bg-green-500 focus:outline-none'
                                    onClick={() => handleEditSave(task.id,editText)}
                                >Save</button>
                            ):(
                                <button
                                    className='cursor-pointer bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 focus:outline-none'
                                    onClick={() => handleEdit(task.id,task.text)}
                                >Edit</button>

                            )
                        }
                        <button
                            className='border px-2 py-1 rounded bg-red-500 text-white cursor-pointer ml-2 hover:bg-red-600 focus:outline-none'
                            onClick={() => dispatch(deleteTasks(task.id))}
                        >Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TaskList