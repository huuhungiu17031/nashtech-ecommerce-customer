
import { Banner, Navbar } from '@/components';
import { Box } from '@mui/joy';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <Box>
      <Box sx={{ position: 'sticky', top: 0, left: 0, zIndex: 10 }}>
        <Banner />
        <Navbar />
      </Box>
      <Box className="container cps-body">
        <Outlet />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
