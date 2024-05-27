import { Banner, Navbar } from '@/components';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
const styles = {
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 10,
  },
};
const DefaultLayout = () => {
  return (
    <Box>
      <Box sx={styles.header}>
        <Banner />
        <Navbar />
      </Box>
      <Box className="container cps-body" sx={{ marginTop: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
