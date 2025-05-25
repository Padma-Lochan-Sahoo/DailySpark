import React from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className='max-w-2xl mx-auto p-4'>
        {/* Simple Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              DailySpark
            </h1>
          </div>
          <p className="text-gray-600">
            Stay organized and get things done
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <TaskForm />
          <TaskList />
        </div>

        {/* Simple Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Keep it simple, keep it done ✓</p>
        </div>
      </div>
    </div>
  )
}

export default App