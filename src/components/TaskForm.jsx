import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTasks } from '../features/tasks/taskSlice.js';
import { nanoid } from '@reduxjs/toolkit';

const TaskForm = () => {
  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    
    setIsAdding(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      dispatch(addTasks({
        id: nanoid(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      setText('');
      setIsAdding(false);
    }, 300);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input 
          type="text"
          placeholder="Add a new task..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-3 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
          disabled={isAdding}
        />
        
        <button 
          type="submit"
          className={`px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed ${isAdding ? 'animate-pulse' : ''}`}
          disabled={isAdding || !text.trim()}
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;