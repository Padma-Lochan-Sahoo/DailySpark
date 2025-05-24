import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
    try {
        const data = localStorage.getItem("demoTasks")
        return data ? JSON.parse(data): []
    } catch (error) {
        return []
    }
}

const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("demoTasks", JSON.stringify(tasks))
}


const initialState = {
    tasks: loadTasksFromLocalStorage(),
    filter: {
        status: "all",
        search: "",
    }
}


const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTasks: (state,action) => {
            state.tasks.push(action.payload)
            saveTasksToLocalStorage(state.tasks)
        },
        deleteTasks: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
            saveTasksToLocalStorage(state.tasks)
        },
        toggleComplete : (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed
                saveTasksToLocalStorage(state.tasks)
            }
        },
        editTasks: (state, action) => {
            const {id, newText } = action.payload
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.text = newText
                saveTasksToLocalStorage(state.tasks)
            }
        },
        setStatusFilter: (state, action) => {
            state.filter.status = action.payload

        },
        setSearchFilter: (state, action) => {
            state.filter.search = action.payload
        },
    }
})

export const { addTasks, deleteTasks, toggleComplete, editTasks, setStatusFilter, setSearchFilter } = taskSlice.actions


export default taskSlice.reducer
