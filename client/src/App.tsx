// src/App.tsx
import React from 'react';
import './App.css';
import HomePage from './pages/home/HomePage';
import Layout from './Layout/Layout';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import LoginSignup from './pages/Auth/Login/Login';
import BusHub from './pages/Search/BusHub/BusHub';
import { ThemeProvider } from './Context/ThemeContext';
import Places from './pages/Places/Places';
// import Flow from './components/Flow/Flow';

const App: React.FC = () => {
  return (
    <ThemeProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
       <Route index element={<HomePage/>}></Route>
       <Route path='/search' element={<BusHub/>}/>
       <Route path='/places' element={<Places/>}/>
      </Route>
      <Route path='/login' element={<LoginSignup/>}></Route>
    </Routes>     
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
