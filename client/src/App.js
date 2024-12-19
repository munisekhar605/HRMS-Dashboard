import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/employees" element={""} />
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
