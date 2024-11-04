import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabBox() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack direction="row" sx={{ width: '100%' }} className='Info-Section'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" orientation='vertical'>
          <Tab label="What is a Delaunay Triangulation?" {...a11yProps(0)} />
          <Tab label="What is a Voronoi Diagram?" {...a11yProps(1)} />
          <Tab label="Delaunay/Voronoi Relationships" {...a11yProps(2)} />
          <Tab label="Applications" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        A Delaunay Triangulation is a triangulation of a set of points such that no circumcircle formed by any triangle contains within any other point in the set.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        A Voronoi Diagram is a subdivision of a plane given a set of sites (points) such that each point in a cell is closer to that cell's specific site than any other site.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        The circumcenters of Delaunay circumscribed circles are the Voronoi vertices.
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        There are many applications of Delaunay Triangulations and Voronoi Diagrams together.
      </CustomTabPanel>
    </Stack>
  );
}
