// components/AppWrapper.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import App from './App';

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
