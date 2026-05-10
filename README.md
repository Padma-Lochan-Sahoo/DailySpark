# Todo App

A clean and simple todo list application built with React and Redux Toolkit. Stay organized and get things done with an intuitive interface.

---

## 🌐 Live Demo

> **[https://daily-spark-mu.vercel.app](https://daily-spark-mu.vercel.app)**

---

## Features

- ✅ **Add Tasks** - Create new tasks with a simple form
- ✏️ **Edit Tasks** - Click edit to modify existing tasks
- ✓ **Mark Complete** - Check off completed tasks
- 🗑️ **Delete Tasks** - Remove tasks you no longer need
- 🔍 **Search Tasks** - Find tasks quickly with search functionality
- 🏷️ **Filter Tasks** - View all, pending, or completed tasks
- 📊 **Progress Tracking** - Visual progress bar showing completion status
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **React** - Frontend library for building user interfaces
- **Redux Toolkit** - State management with modern Redux patterns
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Nanoid** - Unique ID generation for tasks

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx       # Form component for adding new tasks
│   └── TaskList.jsx       # Component for displaying and managing tasks
├── features/
│   └── tasks/
│       └── taskSlice.js   # Redux slice for task management
├── store/
│   └── store.js           # Redux store configuration
├── App.jsx                # Main application component
└── index.js               # Application entry point
```

## Redux State Management

The application uses Redux Toolkit for state management with the following actions:

- `addTasks` - Add a new task
- `editTasks` - Edit an existing task
- `deleteTasks` - Delete a task
- `toggleComplete` - Toggle task completion status
- `setSearchFilter` - Set search filter
- `setStatusFilter` - Set status filter (all/pending/completed)

## Components

### TaskForm
- Handles new task creation
- Input validation
- Loading states during task addition

### TaskList
- Displays filtered tasks
- Progress tracking
- Search functionality
- Filter buttons (All, Pending, Completed)
- Inline editing
- Task completion toggle
- Task deletion

## Styling

The application uses a clean, minimal design with:
- Blue/purple color palette
- Subtle gradients and shadows
- Smooth transitions
- Responsive layout
- Accessibility-friendly design

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from modern todo applications
- Color palette inspired by contemporary UI trends
- Built with Create React App for easy setup and deployment

---

**Keep it simple, keep it done ✓**
