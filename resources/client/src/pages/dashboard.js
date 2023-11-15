import React, { useState ,useEffect} from 'react';
import './dashboard.css' 

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const Header = ({ onAddTask, navigate }) => (
  <div className="max-width-container">
    <div className="header flex items-center justify-between">
      <h1 className="title">My tasks</h1>
      <div className="buttons-container">
        <button
          id="add-task-cta"
          className="button regular-button blue-background"
          onClick={onAddTask}
        >
          Add task
        </button>
        <button className="sign-out-cta">Sign out</button>
      </div>
    </div>
  </div>
);




const RadioButtons = ({ onViewChange }) => (
  <div className="radio-buttons-container">
    <div className="max-width-container flex">
      {/* Repeat for 'board' */}
      <div className="radio-container">
        <input
          type="radio"
          id="list"
          name="view-option"
          value="list"
          defaultChecked
          onChange={() => onViewChange('list')}
        />
        <label htmlFor="list" className="radio-label">
          {/* Icon and span for "List" */}
        </label>
      </div>
      {/* ... Board radio button ... */}
    </div>
  </div>
);
const TaskList = ({ tasks, onDeleteTask, onEditTask }) => (
    <div className="max-width-container">
      <div id="list-view" className="list-view">
        {['Todo', 'Doing', 'Done'].map((status) => (
          <div key={status} className={`list-container ${status.toLowerCase()}`}>
            <div className="list-header">
              <span className="text">{status}</span>
            </div>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="task-item">
                  <span className="task-name">{task.name}</span>
                  <span className="task-due-date">{`Due on ${task.dueDate}`}</span>
                  <div className="task-actions">
                    
                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
  


  
  

  const TaskOverlay = ({ isVisible, onClose, onSubmit, task }) => {
    // Only show the overlay if it is supposed to be visible
    if (!isVisible) return null;
  
    return (
      <div id="set-task-overlay" className="overlay set-task-overlay">
        <form onSubmit={(e) => onSubmit(e, task)}>
          <input
            type="text"
            placeholder="Task Name"
            name="taskName"
            required
            defaultValue={task ? task.name : ''}
          />
          <input
            type="date"
            name="taskDueDate"
            required
            defaultValue={task ? task.dueDate : ''}
          />
          <select name="status" required defaultValue={task ? task.status : 'Todo'}>
            <option value="Todo">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
          <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
  
  

  
  

const ViewTaskOverlay = ({ isVisible, onClose }) => (
  isVisible && (
    <div id="view-task-overlay" className="overlay view-task-overlay">
      <button onClick={onClose}>Close</button>
      {/* Display task details */}
    </div>
  )
);

const Notification = ({ message, isVisible }) => (
  isVisible && (
    <div id="notification" className="notification green-background">
      {message}
    </div>
  )
);




const Dashboard = () => {
  const [viewOption, setViewOption] = useState('list');
  const [isTaskOverlayVisible, setTaskOverlayVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
}, [])

  const handleAddTaskClick = () => {
    setTaskOverlayVisible(true);
  };

  const handleOverlayClose = () => {
    setTaskOverlayVisible(false);
    setSelectedTask(null);
  };

  const handleViewChange = (view) => {
    setViewOption(view);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleAddNewTask = (e, taskToEdit) => {
    e.preventDefault();
    const { taskName, taskDueDate, status } = e.target.elements;
    
    if (taskToEdit) {
      // If editing an existing task, find the task by its id and update its properties
      setTasks(tasks.map(task => {
        if (task.id === taskToEdit.id) {
          return { ...task, name: taskName.value, dueDate: taskDueDate.value, status: status.value };
        }
        return task;
      }));
    } else {
      // If adding a new task (taskToEdit is undefined or null)
      const newTask = { // Declare and define the newTask variable
        id: Date.now(), // Ensure this is a unique id
        name: taskName.value,
        dueDate: taskDueDate.value,
        status: status.value,
      };
      setTasks([...tasks, newTask]); // Add the new task to the existing tasks array
    }
    
    handleOverlayClose(); // Close the overlay after adding or editing the task
  };
  
  
  

  const handleDeleteTask = (taskId) => {
    // Filter out the task to be deleted
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setSelectedTask(taskToEdit); // Set the task to edit
      setTaskOverlayVisible(true);  // Make the overlay visible
    }
  };
  
  
  


  return (
    <div className="dashboard">
      <Header onAddTask={handleAddTaskClick} />
      <RadioButtons onViewChange={handleViewChange} />
      <TaskOverlay
        isVisible={isTaskOverlayVisible}
        onClose={handleOverlayClose}
        onSubmit={handleAddNewTask}
        task={selectedTask} // Pass the task to be edited, or null if adding a new task
      />
      {selectedTask && (
        <ViewTaskOverlay
          isVisible={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
        />
      )}
      <Notification message="Task was deleted" isVisible={showNotification} />
      {/* Render TaskList only once with the required props */}
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask} // Passing the delete handler as a prop
        onEditTask={handleEditTask} // Passing the edit handler as a prop
      />
    </div>
  );
  
};
export default Dashboard;
