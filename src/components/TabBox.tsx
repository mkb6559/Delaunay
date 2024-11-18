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
    'aria-controls': `simple-tabpanel-${index}`
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
      A <b>Delaunay Triangulation</b> triangulates a set of points such that no circumcircle of any triangle - that is, the circle containing the triangle’s three vertices on its circumference - contains any other point in the set. The plot above will create a Delaunay Triangulation of a set of points - click to place a point on the canvas, and the triangulation will automatically be created.
      <br/>
      One side effect of the circumcircle rule - known as the “Delaunay condition” - is that a Delaunay triangulation generally produces “nice” triangles. Mathematically, the minimum angle of the triangulation is maximized, as is the 2nd minimum, 3rd minimum, and so on. Experiment by creating a triangulation and moving (click and drag) a point around. Notice how when a point moves around the center, the triangulation quickly forms and deletes edges, keeping its pattern of “nice” triangles rather than stretching and modifying the previous ones. 
      <br/>
      Delaunay Triangulations aren't necessarily unique to a set of points - consider a square inscribed in a circle. Such a configuration has 2 Delaunay triangulations. However since such arrangements are unlikely we can safely ignore these degenerate situations, and for the purposes of this demonstration, they produce the same results.

      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      A <b>Voronoi Diagram</b> divides a plane into a set of cells (some of which may be unbounded) given a set of sites (corresponding to the “points” in the Delaunay Triangulation description). Each cell contains exactly one site, and every point in a cell is closer to its cell’s site than any other site. If a point is equidistant from two sites, it lies on an edge (e.g. cell divider) on the Voronoi graph, and any point equidistant from 3 or more sites will define a Voronoi vertex - the intersection of 3 or more edges. Add sites by clicking on the canvas. See how the Voronoi diagram changes as you drag the sites around. Observe how regions only intersect at 3 points (except in the degenerate case where 4+ sites lie on the same circle).
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      A key relationship exists between the centers of each circumscribed circle of a triangle in a Delaunay triangulation (or circumcenters) and the cell dividers in a Voronoi diagram. Namely, the circumcenters of each Delaunay triangle define the vertices of a Voronoi diagram. Given the Delaunay triangulation of a set of points, a Voronoi diagram with those points as the “sites” can be mostly constructed by connecting the circumcenter of each triangle to the circumcircles of neighboring triangles. The Voronoi diagram may be completed by drawing an infinite-length Voronoi edge out from each outer-triangle circumcircle in such a way that it bisects the edge of its corresponding Delaunay triangle that is on the point set’s convex hull.
      <br/>
      <b>Why does this work?</b> Recall that the vertices of a Voronoi diagram must be equidistant from at least 3 sites - otherwise, they’d be in an individual cell or on an edge between two of them. Similarly, a triangle circumcenter must be equidistant from at least 3 sites since it defines the center of a circle that contains the triangle’s 3 vertices on its circumference. It makes sense, therefore, that a connecting line between two circumcenters would be equidistant from the two sites that share both circumcenters. But how do we know which circumcenters to connect?
      <br/>
      Two sites connected by an edge in a Delaunay triangulation share two triangles and therefore two circumcenters - let’s take a hypothetical pair like that and draw a line between the circumcenters. Can we guarantee that this is an edge in the Voronoi diagram? The short answer is yes. For this line to be a Voronoi edge, it must be true that every point on the line is equidistant from our two sites and that no other site is closer. The first requirement is obviously true, as discussed above. To understand the second one, consider a third site that is closer to the line we’ve drawn than the two subject sites. We already know that this third site cannot be within the circle centered at either circumcenter - and as it turns out, every point on the line we’ve drawn is within one of these two circles. 
      <br/>
      Suppose the farthest circumcenter is a distance n from each site. We must travel a distance of more than n on the line between the circumcenters to escape the first circumcircle. We know, however, that the converse is also true for some distance k &lt; n. If we imagine an angular sweep of both radius lines, they must extend past the straight line connecting the two sites when they pass through that region of the circumcircle. To remain equidistant from the two sites, so must the line between circumcenters! Therefore, the Voronoi edge we’ve drawn has length &lt; n+k and remains in one of the circumcircles. Observe this phenomenon on the Voronoi view by turning on circumcircle superimposition and watch how each Voronoi edge passes through two overlapping circumcircles.

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      While there are no prominent applications which explicitly use the Delaunay Triangulation and Voronoi Diagram of the same set of points, the close relationship between the two graphs is evident in a few domains. Both are used in different contexts in Global Information Systems, for example. While Voronoi diagrams are often used for nearest-site applications like service delineation (ex. which hospital is closest to some location?), Delaunay Triangulations are useful in terrain modeling and are famously good at accurately representing elevation differences. Both are highly useful for spatial analysis in general and provide a wealth of information about a terrain or surface when used in conjunction.

      </CustomTabPanel>
    </Stack>
  );
}
