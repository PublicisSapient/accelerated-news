import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Headlines, NotFound } from './pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Headlines />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
