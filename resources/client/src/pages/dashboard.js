import React, { useState } from 'react';
import './dashboard.css' 

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

const TaskList = ({ tasks }) => (
    <div className="max-width-container">
      <div id="list-view" className="list-view">
        {['Todo', 'Doing', 'Done'].map((status) => (
          <div key={status} className={`list-container ${status.toLowerCase()}`}>
            <div className="list-header">
              <span className="text">{status}</span>
            </div>
            {tasks
              .filter((task) => task.status === status)
              .map((task, index) => (
                <div key={index} className="task-item">
                  <button className="task-button">
                    <span className="task-name">{task.name}</span>
                    <span className="task-due-date">{`Due on ${task.dueDate}`}</span>
                    <span className="arrow-icon">{'>'}</span>
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );


  
  

 const TaskOverlay = ({ isVisible, onClose, onAddTask }) => (
  isVisible && (
    <div id="set-task-overlay" className="overlay set-task-overlay">
      <form onSubmit={onAddTask}>
        <input type="text" placeholder="Task Name" name="taskName" required />
        <input type="date" placeholder="Due Date" name="taskDueDate" required /> {/* This is the new due date input */}
        <select name="status" required>
          <option value="Todo">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  )
);

  
  

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

  const handleDeleteTask = () => {
    // Implement task deletion logic
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    const { taskName, taskDueDate, status } = e.target.elements; // Get the due date from the form
    // Create a new task object
    const newTask = {
      name: taskName.value,
      dueDate: taskDueDate.value, // Store the due date
      status: status.value,
    };
    // Add the new task to the tasks array
    setTasks([...tasks, newTask]);
    // Close the overlay
    handleOverlayClose();
  };
  


  return (
    <div className="dashboard">
      <Header onAddTask={handleAddTaskClick} />
      <RadioButtons onViewChange={handleViewChange} />
      {viewOption === 'list' && <TaskList tasks={tasks} />}
      <TaskOverlay isVisible={isTaskOverlayVisible} onClose={handleOverlayClose} />
      {selectedTask && (
        <ViewTaskOverlay
          isVisible={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
        />
      )}
      <Notification message="Task was deleted" isVisible={showNotification} />
      <TaskOverlay
      isVisible={isTaskOverlayVisible}
      onClose={handleOverlayClose}
      onAddTask={handleAddNewTask}
    />
    
    </div>
  );
};
export default Dashboard;
