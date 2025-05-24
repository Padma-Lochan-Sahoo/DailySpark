import  { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTasks } from '../features/tasks/taskSlice.js'
import { nanoid } from '@reduxjs/toolkit';

const TaskForm = () => {
    const [text, setText] = useState('');

    const dispatch = useDispatch();
    


    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === '') {
            return; // Prevent adding empty tasks
        }
        dispatch(addTasks({
            id: nanoid(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }))
        setText('');
    }
  return (
    <form onSubmit={handleSubmit} className='flex gap-2 items-center mb-4'>
        <input 
        type="text"
        placeholder='Add new Task ...' 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='flex-1 border-2 border-gray-400 p-2 rounded-md focus:outline-none'
        />
        <button 
        className='bg-blue-500 text-white rounded px-6 py-2 hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer'
        type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm