import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Wrapper } from './Wrapper';
import { Menu } from './Menu';
import { NavBar } from './NavBar';
import { View } from './View';

export const App: FC = () => {
  return (
    <Wrapper>
      <Menu>
        <NavBar />
      </Menu>
      <Routes>
        <Route path="view" element={<View />} />
        <Route path="control" element={null} />
      </Routes>
    </Wrapper>
  );
};
