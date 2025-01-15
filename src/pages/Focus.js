import React, { useState, useEffect } from 'react'; 
import { getRandomQuote } from '../utils/Motivation';
import SpotifyPlayer from '../utils/SpotifyPlayer';
import { getCurrentTime, getGreeting } from "../utils/TimeUtility";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Ambient from '../pages/Ambient';
import PomodoroTimer from '../utils/PomodoroTimer';

export default function Focus() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  }

  const handleGoToAmbient = () => {
    navigate('/ambient');
  }


  const handleGoToHomepage=()=>
  {
    navigate('/');
  }

  const [quote, setQuote] = useState('');
  const [isIframeVisible, setIsIframeVisible] = useState(false);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [bgImage, setBgImage] = useState('');

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

  useEffect(() => {
    const randomQuote = getRandomQuote();
    setQuote(randomQuote);
  }, []);

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

  return (
    <div className='backdrop-blur-3xl bg-gradient-to-r from-violet-400 to-pink-300 flex flex-col h-screen border-none shadow-lg overflow-hidden' style={{ backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='top w-full h-32 flex flex-col md:flex-row items-center justify-between p-0.5'>
        <div className='logo pl-4'>
          <h1 className='font-lobster text-white text-4xl cursor-pointer' onClick={handleGoToHomepage}>VisionFlow</h1>
        </div>
        <div className='mot-quote-generator pr-4'>
          <p className='text-white text-xl font-bold text-center'>{quote}</p>
        </div>
      </div>
      <div className='flex-grow  flex flex-col md:flex-row items-center justify-start' style={{ height: 'calc(100vh - 16rem)' }}>
        <div className='music-frame-wrapper flex items-end justify-center h-full w-full md:h-full md:w-3/12 mb-0'>
          {isIframeVisible && (
            <div id="embed-iframe">
              <SpotifyPlayer />
            </div>
          )}
        </div>
        <div className='bg-wrapper flex flex-col items-center justify-start  w-full md:w-2/4 h-3/4  md:mt-2 transform scale-50 md:scale-100'>
          
          <div className="blur-container backdrop-blur-sm md:p-4 rounded-2xl ">
            <PomodoroTimer />
          </div>
        </div>

        <div
          className={`slider absolute top-0 right-0 h-5/6 w-2/4 bg-gray-800 text-white p-4 transition-transform duration-1000 ease-in-out ${isSliderVisible ? 'transform-none' : 'transform translate-x-full'}`}
        >
          <h2 className="text-xl font-bold">Pick your desired theme</h2>
          <p>Travel into any scene you want just by a click! </p>
          <div className='theme-cards h-4/5 w-full mr-auto flex items-center justify-center flex-col mt-2'>
            <div className='row bg-slate-600 w-full h-2/4  flex items-center justify-evenly'>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/market.jpeg')}>
                <img src='/assets/images/market.jpeg' className='w-full h-full object-fill' alt='market' />
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/clouds.gif')}>
                <img src='/assets/images/clouds.png' className='w-full h-full object-fill' alt='clouds' />
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/cars.gif')}>
                <img src='/assets/images/cars.png' className='w-full h-full object-fill' alt='cars' />
              </div>
            </div>
            <div className='row bg-slate-600 w-full h-2/4 flex items-center justify-evenly'>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/rain.gif')}>
                <img src='/assets/images/rain.png' className='w-full h-full object-fill' alt='rain' />
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/library.jpeg')}>
                <img src='/assets/images/library.jpeg' className='w-full h-full object-fill' alt='library' />
              </div>
              <div className='card h-3/4 w-1/4 bg-slate-600 border-none' onClick={() => handleBgChange('/assets/images/window.gif')}>
                <img src='/assets/images/window.png' className='w-full h-full object-fill' alt='window' />
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
      <div className='bottom w-full h-32 flex-shrink-0'>
        <div className='icon-bar p-4 gap-x-3'>
          <button className='p-2 bg-pink-200 rounded-2xl gap-x-3 px-3 py-3 flex float-right'>
            <button className='bg-pink-300 hover:bg-pink-400 p-1 rounded-full focus:bg-violet-500' onClick={handleGoToAmbient}>
              <img src='\assets\images\ambient mode-light.png' className='h-10 w-10' />
            </button>
            <button className='bg-pink-300 hover:bg-pink-400 p-1 rounded-full focus:bg-violet-500' onClick={handleGoToDashboard}>
              <img src='\assets\images\home.png' className='h-10 w-10' />
            </button>
            <button className='bg-pink-300 hover:bg-pink-400 p-1 rounded-full focus:bg-violet-500' >
              <img src='\assets\images\focus.png' className='h-10 w-10' />
            </button>
            <button className='settings bg-pink-200 rounded-full p-1 hover:bg-pink-400 focus:bg-violet-500' onClick={toggleSliderVisibility}>
              <img src='/assets/images/settings.png' className='h-10 w-10' />
            </button>
          </button>
          <button className='bg-pink-200 flex float-left rounded-2xl px-3 py-3 p-2 hover:bg-pink-300' onClick={toggleIframeVisibility}>
            <img src='/assets/images/music-black.png' className='h-10 w-10 p-1' />
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Focus />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ambient" element={<Ambient />} />
        </Routes>
      </Router>
    </div>
  );
}
