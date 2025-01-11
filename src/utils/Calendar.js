import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../App.css';

const Calendar = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState(null);
  const [tasks, setTasks] = useState({});

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Log tasks object and tasks for specific date
  useEffect(() => {
    console.log("Current Tasks:", tasks);
    if (taskDate) {
      console.log(`Tasks for ${taskDate}:`, tasks[taskDate]);
    }
  }, [tasks, taskDate]);

  // Handle the click on a date
  const handleDateClick = (info) => {
    console.log("Date clicked:", info.dateStr);
    setTaskDate(info.dateStr);
    setNewTaskTitle('');
  };

  // Handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      console.log("Adding Task:", newTaskTitle, "on", taskDate);
      const updatedTasks = { ...tasks };
      // If no tasks for this date, create an empty array for this date
      if (!updatedTasks[taskDate]) {
        updatedTasks[taskDate] = [];
      }
      updatedTasks[taskDate].push(newTaskTitle);

      // Log the updated tasks object before state update
      console.log("Updated Tasks before setState:", updatedTasks);

      setTasks(updatedTasks); // Update state
      setNewTaskTitle('');
      setTaskDate(null);

      // Save tasks to localStorage after updating
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // Log the updated tasks after state update
      console.log("Updated Tasks after setState:", updatedTasks);
    } else {
      console.log("Task title is empty or invalid.");
    }
  };

  // Prepare events for FullCalendar
  const getCalendarEvents = () => {
    return Object.keys(tasks).map((date) => ({
      title: tasks[date].join(', '),
      date: date,
    }));
  };

  return (
    <div className="p-4 bg-inherit rounded-lg shadow-md h-full w-full flex items-start justify-center flex-col text-white text-xl" style={{ transform: 'scale(0.7)' }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        events={getCalendarEvents()}
        eventColor="purple"
        eventTextColor="white"
        dayCellDidMount={(info) => {
          // Access the day cell and its text number
          const dayElement = info.el.querySelector('.fc-day-number');
          if (dayElement) {
            // Get the month number from the date (0-based, 0 = January)
            const month = info.date.getMonth(); // Use getMonth() on the Date object

            // Change text color for specific months (e.g., January is 0)
            if (month === 0) { // January (change as needed)
              dayElement.style.color = 'white'; // Set text color to white
            }
          } else {
            console.error('Day element not found for', info.dateStr);
          }
        }}
      />

      {taskDate && (
        <div className="mt-1 p-4 bg-inherit rounded-lg">
          <input
            type="text"
            className="w-full p-2 rounded-md focus:outline-none bg-inherit text-white text-xl placeholder-white"
            placeholder="Enter task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-purple text-white rounded-md"
            onClick={handleTaskSubmit}
          >
            Add Task
          </button>
        </div>
      )}

      {/* Render tasks for the selected date */}
      {taskDate && tasks[taskDate] && tasks[taskDate].length > 0 ? (
        <div className="mt-4 p-4 bg-inherit rounded-lg">
          <h4 className="font-bold">Tasks for {taskDate}:</h4>
          <ul>
            {tasks[taskDate].map((task, index) => (
              <li key={index} className="text-white">{task}</li>
            ))}
          </ul>
        </div>
      ) : taskDate && (!tasks[taskDate] || tasks[taskDate].length === 0) ? (
        <div className="mt-4 p-4 bg-inherit rounded-lg text-white text-xl">
          No tasks available for {taskDate}.
        </div>
      ) : null}
    </div>
  );
};

export default Calendar;
