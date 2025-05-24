import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../features/tasks/taskSlice.js'
export const store = configureStore({
  reducer: {
    // Add your reducers here
    tasks: taskReducer
  },
})