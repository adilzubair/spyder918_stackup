import React, { useState } from 'react';
// import IconifyIcon from '@iconify/react'; // Assuming Iconify is installed as an npm package

const Dashboard = () => {
    const [viewOption, setViewOption] = useState('list');

    // Handlers for various actions like toggling the view, adding a task, etc.
    const handleViewChange = (event) => {
        setViewOption(event.target.value);
    };

    // ... other handler functions

    return (
        <div className="content-container">
            {/* Notification */}
            <div id="notification" className="notification green-background">
                <IconifyIcon icon="mdi:check-circle-outline" style={{ color: 'black' }} width="24" height="24" />
                <p>The task was deleted</p>
            </div>

            {/* Header */}
            <div className="max-width-container">
                <div className="header flex items-center justify-between">
                    <h1 className="title">My tasks</h1>
                    <div className="buttons-container">
                        <button id="add-task-cta" className="button regular-button blue-background">
                            Add task
                        </button>
                        <button className="sign-out-cta">Sign out</button>
                    </div>
                </div>
            </div>

            {/* Radio Buttons */}
            <div className="radio-buttons-container">
                <div className="max-width-container flex">
                    {/* ...radio buttons setup similar to this first one */}
                    <div className="radio-container">
                        <input
                            type="radio"
                            id="list"
                            name="view-option"
                            value="list"
                            className="radio-input"
                            checked={viewOption === 'list'}
                            onChange={handleViewChange}
                        />
                        <label htmlFor="list" className="radio-label">
                            <IconifyIcon icon="material-symbols:format-list-bulleted-rounded" style={{ color: 'black' }} width="24" height="24" />
                            <span>List</span>
                        </label>
                    </div>
                    {/* ...other radio button for 'board' */}
                </div>
            </div>

            {/* Tasks Section */}
            {/* Use conditional rendering to display list or board view based on viewOption */}
            <div className="max-width-container">
                {viewOption === 'list' ? (
                    <div id="list-view" className="list-view">
                        {/* ...list view content */}
                    </div>
                ) : (
                    <div id="board-view" className="board-view">
                        {/* ...board view content */}
                    </div>
                )}
            </div>

            {/* ...Rest of the component */}
            {/* Add Task Overlay */}
            {/* View Task Overlay */}
        </div>
    );
};

export default Dashboard;
