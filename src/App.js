import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Focus from './pages/Focus';
import Ambient from './pages/Ambient';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/focus" element={<Focus />} /> 
          <Route path="/ambient" element={<Ambient />} /> 


        </Routes>
      </Router>
    </div>
  );
}

function MainPage() {
  const [isFocusMode, setIsFocusMode] = useState(true);
  const navigate = useNavigate(); 

  const handleGoToDashboard = () => {
    navigate('/dashboard'); 
  };

  const handleSwitchMode = () => {
    setIsFocusMode(!isFocusMode); 
  };


  return (
    <div
      className="bg-cover bg-center min-h-screen overflow-visible"
      style={{ backgroundImage: "url('/assets/images/visionflowbg.jpeg')" }}
    >
      <Navbar />
      <div id="home" className="text-center space-y-3 mb-7 ">
        <h1 className="text-purple text-center text-4xl font-bold">
          Where Minimalism meets <br />
          Meaningful Progress
        </h1>
        <p className="text-purple text-center text-2xl">
          VisionFlow is a serene, purpose-driven workspace <br /> designed to harmonize focus and productivity.
        </p>
        <button
          className="bg-purple hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGoToDashboard} 
        >
          Go to Dashboard
        </button>
        <div className="image-container bg-inherit h-64 w-full md:h-96 md:w-2/4 mx-auto flex items-center justify-center rounded-xl">
  <video src='/assets/images/slideshow.mp4' className='object-cover rounded-xl w-full h-full' autoPlay loop muted />
</div>


      </div>
      <div
        className="flex flex-wrap items-center justify-evenly gap-x-16 gap-y-8 p-10"
        id="features"
      >
        {renderFeatureCards()}
      </div>
      <div
      className={`switching ${
        isFocusMode ? "bg-white text-purple" : "bg-purple text-white"
      } flex flex-col items-center justify-evenly p-8 transition-all duration-500 space-y-2 `} id='switch'
    >        <h1 className="text-4xl font-extrabold ">Flip the Switch</h1>
        <p className="text-2xl font-bold mt-0">
          Try VisionFlow's exclusive Focus Mode and Ambient Mode for yourself
        </p>
        <button onClick={handleSwitchMode} className="transition-transform duration-300 hover:scale-105">
        <img
          src={
            isFocusMode
              ? "/assets/images/switch-off-purple.png"
              : "/assets/images/switch-off-pink.png"
          } 
          alt="Switch Mode"
          
        />
      </button>
          
      <div
        className={`image-container border-none h-64 w-full md:h-96 md:w-2/4 mb-96 flex items-center  justify-center rounded-xl transition-all duration-500 ${
          isFocusMode ? "bg-gray-200" : "bg-green-500"
        }`}
      >
        <img
          src={
            isFocusMode
              ? "/assets/images/focusmode.png"
              : "/assets/images/ambientmode.png"
          }
          alt="Mode Image"
          className="w-full h-full rounded-xl border-none"
        />
      </div>
    </div>

    <div className="guide bg-inherit w-full min-h-screen" id="guide">
  <h1 className="text-purple text-center font-lobster text-4xl md:text-6xl p-4">
    A User's Guide to VisionFlow
  </h1>

  {/* Home Section */}
  <div className="contain-img h-full w-full flex flex-col md:flex-row items-center justify-center gap-y-4 p-4">
    <div className="act-img h-full w-full md:w-1/2 overflow-hidden flex items-center justify-center">
      <video
        src="/assets/images/homevid.mp4"
        className="w-full md:w-3/4 h-2/5 md:h-auto object-cover rounded-xl"
        autoPlay
        loop
        muted
      />
    </div>
    <div className="h-full w-full md:w-1/3 flex flex-col text-center md:text-left">
      <h1 className="text-2xl md:text-3xl text-purple font-extrabold p-2 font-lobster mt-6 md:mt-10">
        Home
      </h1>
      <p className="text-bold text-purple font-bold text-lg md:text-xl p-2">
        Step into Home Mode on Vision Flow — where time meets inspiration. The clock ticks in real-time, greetings shift with the day’s rhythm, and motivational quotes seamlessly fuel your drive. Your productivity, redefined.
      </p>
    </div>
  </div>

  {/* Focus Mode Section */}
  <div className="contain-img h-full w-full flex flex-col-reverse md:flex-row items-center justify-center gap-y-4 p-4">
    <div className="h-full w-full md:w-1/3 flex flex-col text-center md:text-left">
      <h1 className="text-2xl md:text-3xl text-purple font-extrabold font-lobster mt-6 md:mt-10 pl-0 md:pl-24 pb-4 pt-8">
        Focus Mode
      </h1>
      <p className="text-purple font-bold text-lg md:text-xl pl-0 md:pl-24">
        Unlock Focus Mode on Vision Flow — your ultimate productivity companion. Featuring a customizable Pomodoro timer with short and long breaks tailored to your rhythm, it lets you craft the perfect flow. Stay sharp, stay focused, your way.
      </p>
    </div>
    <div className="act-img h-full w-full md:w-1/2 overflow-hidden flex items-center justify-center ml-auto">
      <video
        src="/assets/images/focusvid.mp4"
        className="w-full md:w-3/4 h-2/5 md:h-auto object-cover rounded-xl"
        autoPlay
        loop
        muted
      />
    </div>
  </div>

  {/* Ambient Mode Section */}
  <div className="contain-img h-full w-full flex flex-col md:flex-row items-center justify-center gap-y-4 p-4">
    <div className="act-img h-full w-full md:w-1/2 overflow-hidden flex items-center justify-center">
      <video
        src="/assets/images/ambientvid.mp4"
        className="w-full md:w-3/4 h-2/5 md:h-auto object-cover rounded-xl"
        autoPlay
        loop
        muted
      />
    </div>
    <div className="h-full w-full md:w-1/3 flex flex-col text-center md:text-left mt-6 md:mt-10">
      <h1 className="text-2xl md:text-3xl text-purple font-extrabold p-2 font-lobster mt-6 md:mt-10">
        Ambient Mode
      </h1>
      <p className="text-bold text-purple font-bold text-lg md:text-xl p-2">
        Enter Ambient Mode on Vision Flow — where organization meets tranquility. With an in-built calendar that lets you schedule appointments with a simple click and a seamless to-do list to keep you on track, staying organized has never felt this effortless.
      </p>
    </div>
  </div>
</div>

<div className='copyright-banner bg-white w-full h-auto mt-10'>
<h1 className='text-purple font-bold text-lg text-center p-4'>© 2025 Chaitanya Behl All Rights Reserved</h1>
</div>










      
    </div>
  );
}

function renderFeatureCards() {
  const features = [
    {
      image: './assets/images/calendar.png',
      title: 'Built-in Schedule Calendar',
      description: 'A sleek calendar feature to plan your day, manage deadlines, and keep your schedule on track.',
    },
    {
      image: './assets/images/music.png',
      title: 'Built-in Music',
      description: 'Enjoy soothing background music tailored to create a peaceful and productive environment.',
    },
    {
      image: './assets/images/quotes.png',
      title: 'Motivational Quotes',
      description: 'Daily curated quotes to inspire and uplift your mood, keeping you motivated throughout the day.',
    },
    {
      image: './assets/images/themes.png',
      title: 'Radiant Themes',
      description:
        'A collection of calming, aesthetic themes to personalize your workspace and enhance your focus.',
    },
    {
      image: './assets/images/timer.png',
      title: 'Focus Timer',
      description:
        'A customizable timer designed to help you stay focused and boost productivity with structured work intervals.',
    },
    {
      image: './assets/images/todo-white.png',
      title: 'Visionary Task Management',
      description:
        'A dynamic and intuitive to-do list that lets you prioritize, organize, and track your tasks effortlessly.',
    },
  ];

  return features.map((feature, index) => (
    <div
      key={index}
      className="card backdrop-blur-3xl bg-gradient-to-r from-violet-400 to-pink-300 h-[400px] w-[350px] rounded-3xl flex border-none shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="card-icon items-center mx-auto justify-center m-3">
        <img src={feature.image} height={100} width={100} alt={feature.title} />
      </div>
      <div className="card-content text-white text-center p-2">
        <h1 className="text-4xl">{feature.title}</h1>
        <p className="text-2xl m-3">{feature.description}</p>
      </div>
    </div>
  ));
}

  

export default App;
