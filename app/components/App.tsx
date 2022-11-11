import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';
import { View } from './View';

export const App: FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="view" element={<View />} />
        <Route path="control" element={null} />
      </Routes>
    </>
  );
};
