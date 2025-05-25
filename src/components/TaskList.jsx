import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleComplete, editTasks, deleteTasks, setSearchFilter, setStatusFilter } from '../features/tasks/taskSlice';

const TaskList = () => {
  const { tasks = [], filter = { search: '', status: 'all' } } = useSelector((state) => state.tasks || {});
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");


  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const isAllCompleted = totalCount > 0 && completedCount === totalCount;


  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditSave = (id, text) => {
    if (text.trim() === "") {
      alert("Task text cannot be empty");
      return;
    }
    dispatch(editTasks({ id, newText: text }));
    setEditId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
  };

  const filteredTasks = tasks.filter(task => {
    if (filter.status === "completed") {
      return task.completed;
    }
    if (filter.status === "pending") {
      return !task.completed;
    }
    return true;
  }).filter(task => task.text.toLowerCase().includes(filter.search.toLowerCase()));



  return (
    <>
      <div className="space-y-6">
        {/* Stats Bar */}
        {totalCount > 0 && (
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-800 font-medium">
                Progress: {completedCount} of {totalCount} tasks completed
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-orange-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-800 ease-out"
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-orange-700 font-semibold">
                  {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search your sparks..." 
            value={filter.search} 
            onChange={(e) => dispatch(setSearchFilter(e.target.value))}
            className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 ease-in-out placeholder-gray-400 hover:border-gray-300 focus:outline-none shadow-sm hover:shadow-md"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {["all", "completed", "pending"].map((status) => (
            <button 
              key={status} 
              onClick={() => dispatch(setStatusFilter(status))}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 ${
                filter.status === status 
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg ring-4 ring-orange-200' 
                  : 'bg-white/80 text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'completed' && completedCount > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter.status === status ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {completedCount}
                </span>
              )}
              {status === 'pending' && (totalCount - completedCount) > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter.status === status ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {totalCount - completedCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium mb-2">
                {filter.search ? 'No matching tasks found' : 'No tasks yet'}
              </p>
              <p className="text-gray-400 text-sm">
                {filter.search ? 'Try a different search term' : 'Add your first task to spark your productivity!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`group bg-white/80 backdrop-blur-sm border-2 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:-translate-y-1 ${
                    task.completed 
                      ? 'border-green-200 bg-green-50/50 hover:border-green-300 hover:shadow-md' 
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <label className="flex items-center cursor-pointer mt-1">
                        <input 
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => dispatch(toggleComplete(task.id))}
                          className="sr-only"
                        />
                        <div 
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-in-out ${
                            task.completed 
                              ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-500' 
                              : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                          }`}
                        >
                          {task.completed && (
                            <svg 
                              className="w-3 h-3 text-white" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </label>
                      
                      <div className="flex-1 min-w-0">
                        {editId === task.id ? (
                          <input 
                            type="text" 
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full px-3 py-2 bg-white border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-200"
                            autoFocus
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleEditSave(task.id, editText);
                              } else if (e.key === 'Escape') {
                                handleEditCancel();
                              }
                            }}
                          />
                        ) : (
                          <div>
                            <span className={`block font-medium transition-all duration-300 ${
                              task.completed 
                                ? 'line-through text-gray-400' 
                                : 'text-gray-800 group-hover:text-gray-900'
                            }`}>
                              {task.text}
                            </span>
                            {task.createdAt && (
                              <span className="text-xs text-gray-400 mt-1 block">
                                Created {new Date(task.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Fixed hover area - now shows on entire task hover */}
                    <div 
                      className={`flex items-center gap-2 transition-opacity duration-200 ${
                        editId === task.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {editId === task.id ? (
                        <>
                          <button
                            className="px-3 py-1.5 bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-medium rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200"
                            onClick={() => handleEditSave(task.id, editText)}
                          >
                            Save
                          </button>
                          <button
                            className="px-3 py-1.5 bg-gray-400 text-white text-sm font-medium rounded-lg hover:bg-gray-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-200"
                            onClick={handleEditCancel}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="px-3 py-1.5 bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-sm font-medium rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200"
                            onClick={() => handleEdit(task.id, task.text)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1.5 bg-gradient-to-r from-red-400 to-red-500 text-white text-sm font-medium rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200"
                            onClick={() => {
                              dispatch(deleteTasks(task.id));
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskList;