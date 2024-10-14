import React from 'react';
import './App.css';
import { AppBar, CssBaseline, Link, Stack, Toolbar, Typography } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import Routes from './routes/Router';

function App() {
  return (
    <>
    <CssBaseline/>
    <AppBar position={"sticky"} sx={{margin: 0}}>
      <Toolbar sx={{margin: 0}}>
        <Link href={'/'} sx={{color: '#fff', textDecoration: 'none'}}>
          <Typography variant={'h5'}>
            Delaunay Triangulation & Voronoi Diagrams
          </Typography>
        </Link>
        <Stack direction={'row'} spacing={1} paddingLeft={4}>
          <Link href={'/about'} sx={{color: '#fff', textDecoration: 'none'}}>
            About
          </Link>
          <Link href={'/sources'} sx={{color: '#fff', textDecoration: 'none'}}>
            Sources
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
    <RouterProvider router={Routes}/>
    </>
  );
}

export default App;
