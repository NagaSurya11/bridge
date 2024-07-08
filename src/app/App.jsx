import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import routes from './utils/constants/routes.constant';
import Logo from '../assets/icons/logo.jpg';


const App = () => {
  return (
    <Box className='main'>
      <Box className='header'>
        <img className='logo' src={Logo} alt="bridge" />
        <span className='title'>Bridge</span>
      </Box>
      <Box className='dashboard'>
        <Box className='cd-main'>
          <Box className='container'>
            <Suspense>
              <Routes>
                {routes.map(route => (
                  <Route path={route.path} element={<route.element />} key={route.path} />
                ))}
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default App;