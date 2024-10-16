import { useState } from 'react';
import './App.css';
import { AppBar, CssBaseline, Link, Stack, Toolbar, Typography } from '@mui/material';
import Router from './routes/Router';

function App() {
  const [page, setPage] = useState("project");

  const renderProject = () => setPage("project");
  const renderAbout = () => setPage("about");
  const renderSources = () => setPage("sources");

  return (
    <>
    <CssBaseline/>
    <AppBar position={"sticky"} sx={{margin: 0}}>
      <Toolbar sx={{margin: 0}}>
        <Link href="#" onClick={renderProject} sx={{color: '#fff', textDecoration: 'none'}}>
          <Typography variant={'h5'}>
            Delaunay Triangulation & Voronoi Diagrams
          </Typography>
        </Link>
        <Stack direction={'row'} spacing={1} paddingLeft={4}>
          <Link href="#" onClick={renderAbout} sx={{color: '#fff', textDecoration: 'none'}}>
            About
          </Link>
          <Link href="#" onClick={renderSources} sx={{color: '#fff', textDecoration: 'none'}}>
            Sources
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
    <Router path={page}/>
    </>
  );
}

export default App;
