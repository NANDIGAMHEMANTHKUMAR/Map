import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';

const App = () => {
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/" element={<Login />} />
      </Routes> 
    </BrowserRouter>
  );
};

export default App;
