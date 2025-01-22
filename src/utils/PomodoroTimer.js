import React, { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60); // Default time is 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Pomodoro"); // Modes: Pomodoro, Short Break, Long Break
  const [task, setTask] = useState(""); // State for the task
  const [showTask, setShowTask] = useState(false); // State to control task display

  // Custom time limits
  const [pomodoroTime, setPomodoroTime] = useState(25); // in minutes
  const [shortBreakTime, setShortBreakTime] = useState(5); // in minutes
  const [longBreakTime, setLongBreakTime] = useState(10); // in minutes

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    } else if (time === 0) {
      playAlarm();
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const playAlarm = () => {
    const audio = new Audio("/assets/images/alarm-sound.wav");
    audio.play();
  };

  // Handle mode change and reset timer
  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setIsRunning(false);
    if (selectedMode === "Pomodoro") {
      setTime(pomodoroTime * 60);
    } else if (selectedMode === "Short Break") {
      setTime(shortBreakTime * 60);
    } else if (selectedMode === "Long Break") {
      setTime(longBreakTime * 60);
    }
  };

  // Format time as mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTaskSubmit = () => {
    if (task.trim() !== "") {
      setShowTask(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-3/4 text-white -mt-40 md:mt-0">
      {/* Task Input and Display */}
      {!showTask ? (
        <div className="md:text-2xl text-3xl">
           <div className="blur-container backdrop-blur-sm p-4 rounded-xl mb-4">
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="px-4 py-2 text-white rounded-md bg-inherit focus:outline-none mt-3 placeholder-white"
          />
          <button
            onClick={handleTaskSubmit}
            className="ml-2 text-xl"
          >
            ✓ {/* Tick icon */}
          </button>
          </div>
        </div>
      ) : (
        <div className="mb-4 text-3xl  md:text-2xl">
          <p className="font-bold text-3xl">{task}</p>
        </div>
      )}

      {/* Timer Display */}
      <div className="text-6xl font-bold mb-6">{formatTime(time)}</div>

      {/* Controls */}
      <div className="flex gap-4 mb-6 text-xl">
        <button
          className={`px-4 py-2 rounded-lg ${mode === "Pomodoro" ? "bg-purple" : "bg-none"}`}
          onClick={() => handleModeChange("Pomodoro")}
        >
          Pomodoro
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${mode === "Short Break" ? "bg-purple" : "bg-none"}`}
          onClick={() => handleModeChange("Short Break")}
        >
          Short Break
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${mode === "Long Break" ? "bg-purple" : "bg-none"}`}
          onClick={() => handleModeChange("Long Break")}
        >
          Long Break
        </button>
      </div>

      {/* Start/Stop Button */}
      <button
        className="px-6 py-2 bg-purple rounded-lg mb-6"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      {/* Custom Timer Inputs */}
      <div className="flex flex-col items-center gap-4 text-xl">
        <div className="flex gap-2 items-center">
          <label>Pomodoro Time (minutes):</label>
          <input
            type="number"
            min="1"
            value={pomodoroTime}
            onChange={(e) => setPomodoroTime(Number(e.target.value))}
            className="w-16 px-2 py-1 text-white rounded-md bg-inherit focus:outline-none"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label>Short Break Time (minutes):</label>
          <input
            type="number"
            min="1"
            value={shortBreakTime}
            onChange={(e) => setShortBreakTime(Number(e.target.value))}
            className="w-16 px-2 py-1 text-white rounded-md bg-inherit focus:outline-none"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label>Long Break Time (minutes):</label>
          <input
            type="number"
            min="1"
            value={longBreakTime}
            onChange={(e) => setLongBreakTime(Number(e.target.value))}
            className="w-16 px-2 py-1 text-white rounded-md bg-inherit focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
