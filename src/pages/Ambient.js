import React, { useState, useEffect } from 'react';
import SpotifyPlayer from '../utils/SpotifyPlayer'; 
import { getCurrentTime, getGreeting } from "../utils/TimeUtility";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
import Dashboard from '../components/Dashboard';
import Focus from './Focus';
import Calendar from '../utils/Calendar';



export default function Ambient() {
    const navigate=useNavigate();
    const handleGoToDashboard=()=>
    {
     navigate('/dashboard');
    }
 
    const handleGoToFocus=()=>
    {
        navigate('/focus');
    }
  
const handleGoToHomepage=()=>
{
  navigate('/');
}


  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false); 
  const [bgImage, setBgImage] = useState('');
  const [isTodoVisible, setIsTodoVisible] = useState(true);

 
  useEffect(() => {
    const savedBgImage = localStorage.getItem('bgImage');
    if (savedBgImage) {
      setBgImage(`url(${savedBgImage})`);
    }
  }, []);

  useEffect(() => {
    const iframeVisibility = localStorage.getItem('isIframeVisible');
    if (iframeVisibility === 'true') {
      setIsIframeVisible(true);
    }
  }, []);

  const toggleIframeVisibility = () => {
    const newIframeVisibility = !isIframeVisible;
    setIsIframeVisible(newIframeVisibility);
    localStorage.setItem('isIframeVisible', newIframeVisibility.toString());
  };

  const toggleTodoVisibility = () => {
    setIsTodoVisible(!isTodoVisible); 
  };
  

  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setCurrentTime(getCurrentTime());
    setGreeting(getGreeting());
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setGreeting(getGreeting());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSliderVisibility = () => {
    setIsSliderVisible(!isSliderVisible);
  };

  const handleBgChange = (image) => {
    setBgImage(`url(${image})`);
    localStorage.setItem('bgImage', image);  
  };

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };




  
  return (
    <div className='backdrop-blur-3xl bg-gradient-to-r from-violet-400 to-pink-300 flex flex-col h-screen border-none shadow-lg overflow-hidden' style={{ backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center' }} > 
      <div className='top w-full h-32 flex flex-col md:flex-row items-center justify-between p-0.5'>
      <div className='logo pl-4'>
        <h1 className='font-lobster text-white text-4xl cursor-pointer' onClick={handleGoToHomepage}>VisionFlow</h1>
      </div>
     
    </div>
    <div className='flex-grow flex flex-col md:flex-row' style={{ height: 'calc(100vh - 16rem)' }}>
        <div className='music-frame-wrapper flex items-end justify-center w-full h-3/12 md:h-full md:w-3/12 -mt-24 md:mb-0'>
          {isIframeVisible && (
            <div id="embed-iframe">
              <SpotifyPlayer />
            </div>
          )}
        </div>
        <div className='bg-wrapper flex flex-row md:flex-col items-center justify-center w-full h-full md:w-2/4 md:h-3/4 p-0 -mt-8 md:mt-12'>
        <div className={`calendar-container flex items-center justify-center ${
          isTodoVisible ? "hidden" : "block"} md:block`}>
        <div className="blur-container backdrop-blur-none md:backdrop-blur-sm  w-full p-0 rounded-2xl mb-0 md:mb-10  ">
        <Calendar/></div></div>
        </div>

       

<div className='todo-window h-3/12  w-full md:w-3/12 -mt-80 md:mt-0 md:pl-10 md:h-full flex md:flex-col items-start justify-center'>

          {isTodoVisible && ( 
            <div className='todo-container bg-inerit w-3/4 h-2/4 mt-2 md:-mt-10 flex flex-row md:flex-col items-center justify-start'>
           <div className="blur-container backdrop-blur-none md:backdrop-blur-sm p-0 md:p-4 rounded-2xl ">
              <h1 className='text-white font-lobster text-xl text-center p-2'>Tasks for the day:</h1>
            <div className='flex flew-row'>
              <input className='bg-inherit focus:outline-none placeholder-white text-white ' placeholder='Enter your tasks...' type='text' value={newTask}  onChange={(e) => setNewTask(e.target.value)}/>
              <button
          onClick={addTask}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple focus:outline-none"
        >
          Add
        </button>
        </div>
         {/* Task List */}
      <ul className="w-full max-w-screen-sm space-y-3 flex flex-col ">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 border rounded-md text-black ${
                task.completed ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <span
                onClick={() => toggleTaskCompletion(index)}
                className={`cursor-pointer ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(index)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <p className="text-white text-center">No tasks yet. Start adding some!</p>
        )}
      </ul>
      </div>
      </div>
          )}
        
        </div>

        
        <div
          className={`slider absolute top-0 right-0 h-5/6 w-2/4 bg-gray-800 text-white p-4 transition-transform duration-1000 ease-in-out ${isSliderVisible ? 'transform-none' : 'transform translate-x-full'}`}
        >
          <h2 className="text-xl font-bold">Pick your desired theme</h2>
          <p>Travel into any scene you want just by a click! </p>
          <div className='theme-cards h-4/5 w-full mr-auto flex items-center justify-center flex-col mt-2'>
            <div className='row bg-slate-600 w-full h-2/4  flex items-center justify-evenly'>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/market.jpeg')}>
                <img src='/assets/images/market.jpeg' className='w-full h-full object-fill' alt='market'/>
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/clouds.gif')}>
                <img src='/assets/images/clouds.png' className='w-full h-full object-fill' alt='clouds'/>
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/cars.gif')}>
                <img src='/assets/images/cars.png' className='w-full h-full object-fill' alt='cars'/>
              </div>
            </div>
            <div className='row bg-slate-600 w-full h-2/4 flex items-center justify-evenly'>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/rain.gif')}>
                <img src='/assets/images/rain.png' className='w-full h-full object-fill' alt='rain'/>
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/library.jpeg')}>
                <img src='/assets/images/library.jpeg' className='w-full h-full object-fill' alt='library'/>
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/window.gif')}>
                <img src='/assets/images/window.png' className='w-full h-full object-fill' alt='window'/>
              </div>
            </div>
            <div className='row bg-slate-600 w-full h-2/4  flex items-center justify-evenly'>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/snow.gif')}>
                <img src='/assets/images/snow.png' className='w-full h-full object-fill' alt='snow'/>
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/laptop.gif')}>
                <img src='/assets/images/laptop.png' className='w-full h-full object-fill' alt='laptop'/>
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/dandelions.gif')}>
                <img src='/assets/images/dandelions.png' className='w-full h-full object-fill' alt='dandelions'/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom w-full h-32'>
        <div className='icon-bar p-4 gap-x-3'> 
          <button className='p-2 bg-pink-200 rounded-2xl gap-x-3 px-3 py-3 flex float-right'>
            <button className='bg-pink-300 hover:bg-pink-400 p-1 rounded-full focus:bg-violet-500'>
              <img src='\assets\images\ambient mode-light.png' className='h-10 w-10'/>
            </button>
            <button className='bg-pink-300 hover:bg-pink-400 p-1 rounded-full focus:bg-violet-500' onClick={handleGoToDashboard}>
              <img src='\assets\images\home.png' className='h-10 w-10'/>
            </button>
            <button className='bg-pink-300 hover:bg-pink-400 p-1 rounded-full focus:bg-violet-500' onClick={handleGoToFocus} >
              <img src='\assets\images\focus.png' className='h-10 w-10'/>
            </button>
            <button className='settings bg-pink-200 rounded-full p-1 hover:bg-pink-400 focus:bg-violet-500' onClick={toggleSliderVisibility}>
              <img src='/assets/images/settings.png' className='h-10 w-10'/>
            </button>
          </button>
          <button className='bg-pink-200 flex float-left rounded-2xl px-3 py-3 p-2 hover:bg-pink-300' onClick={toggleIframeVisibility}>
            <img src='/assets/images/music-black.png' className='h-10 w-10 p-1'/>
          </button>
          <button className='bg-pink-200 flex float-left rounded-2xl px-3 py-3 p-2 ml-5 hover:bg-pink-300' onClick={toggleTodoVisibility}>
            <img src='/assets/images/todo-md.png' className='h-10 w-10 p-1'/>
          </button>
        </div>
      </div>
    </div>
  );
}
  
function App()
{
  return(
  <div>
     <Router>
            <Routes>
            <Route path="/" element={<Ambient />} />
              <Route path="/dashboard" element={<Dashboard />} /> 
              <Route path='/focus' element={<Focus />} />
            </Routes>
          </Router>
  </div>
  );
}

