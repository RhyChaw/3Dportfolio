import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

import MacHome from './pages/MacHome/MacHome';
import TraditionalHome from './traditional/TraditionalHome';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MacHome />} />
        <Route path="/classic" element={<TraditionalHome />} />
        <Route path="/naruto" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
