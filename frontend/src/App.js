import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Components/home/Home';
import Coursehome from './Components/allcourses/Coursehome';
import Profile from './Components/team/Profile';
import Contribute from './Components/contact/Contribute';
import Login from './Components/Login/Login';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login />} />
          <Route path='/' exact element={<Home />} />
          <Route path='/learn'  element={<Coursehome />} />
          <Route path='/profile'  element={<Profile />} />
          <Route path='/contribute'  element={<Contribute />} />
        </Routes>
      </Router>
    </>
  )
}

export default App