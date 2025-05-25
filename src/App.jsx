import React from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className='max-w-4xl mx-auto p-4 sm:p-6 lg:p-8'>
        {/* Header Section */}
        <div className="text-center mb-8 pt-8 sm:pt-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mr-3 hover:shadow-xl transition-shadow duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent hover:from-orange-700 hover:to-yellow-700 transition-all duration-300">
              DailySpark
            </h1>
          </div>
          <p className="text-gray-600 text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-3">
            Ignite your productivity, one spark at a time ✨
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100 p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
          <TaskForm />
          <TaskList />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Stay focused, stay sparked 🔥</p>
        </div>
      </div>
    </div>
  )
}

export default App