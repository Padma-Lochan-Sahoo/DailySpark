import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleComplete, editTasks, deleteTasks, setSearchFilter, setStatusFilter } from '../features/tasks/taskSlice';

const TaskList = () => {
  const { tasks = [], filter = { search: '', status: 'all' } } = useSelector((state) => state.tasks || {});
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

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
    <div className="space-y-4">
      {/* Simple Progress Bar */}
      {totalCount > 0 && (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-blue-800">Progress</span>
            <span className="text-blue-700 font-medium">
              {completedCount}/{totalCount} tasks
            </span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Simple Search */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={filter.search} 
          onChange={(e) => dispatch(setSearchFilter(e.target.value))}
          className="w-full p-3 pr-10 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Simple Filter Buttons */}
      <div className="flex gap-2">
        {["all", "pending", "completed"].map((status) => (
          <button 
            key={status} 
            onClick={() => dispatch(setStatusFilter(status))}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter.status === status 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Simple Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500 mb-1">
              {filter.search ? 'No matching tasks' : 'No tasks yet'}
            </p>
            <p className="text-gray-400 text-sm">
              {filter.search ? 'Try a different search' : 'Add your first task above'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`group bg-white p-4 rounded-lg border transition-colors ${
                task.completed 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Simple Checkbox */}
                <label className="flex items-center cursor-pointer mt-0.5">
                  <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleComplete(task.id))}
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </label>
                
                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  {editId === task.id ? (
                    <input 
                      type="text" 
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-blue-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      <span className={`block ${
                        task.completed 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-800'
                      }`}>
                        {task.text}
                      </span>
                      {task.createdAt && (
                        <span className="text-xs text-gray-400 block mt-1">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Simple Action Buttons */}
                <div className={`flex gap-1 ${editId === task.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                  {editId === task.id ? (
                    <>
                      <button
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                        onClick={() => handleEditSave(task.id, editText)}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-400 text-white text-sm rounded hover:bg-gray-500 transition-colors"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        onClick={() => handleEdit(task.id, task.text)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        onClick={() => dispatch(deleteTasks(task.id))}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;