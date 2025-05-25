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
    <div className="mb-8">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <div className="relative flex-1 group">
            <input 
              type="text"
              placeholder="What sparks your productivity today?" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="w-full px-4 py-3 sm:py-4 text-base sm:text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 ease-in-out placeholder-gray-400 hover:border-gray-300 focus:outline-none shadow-sm hover:shadow-md focus:shadow-lg"
              disabled={isAdding}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <button 
            className={`px-6 py-3 sm:py-4 sm:px-8 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isAdding ? 'animate-pulse' : ''}`}
            onClick={handleButtonClick}
            disabled={isAdding || !text.trim()}
          >
            {isAdding ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Adding...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">Add</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;