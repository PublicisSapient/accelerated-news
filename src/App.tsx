import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Headlines, NotFound, Sports } from './pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Headlines />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
