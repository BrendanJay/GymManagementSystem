import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './home_page/homepage';
import Login from './login_page/login';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      </Routes> 
    </BrowserRouter>

  );
}


export default App

