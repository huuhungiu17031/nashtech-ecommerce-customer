import images from '@/assets/images';
import { Box } from '@mui/material';

const listBanner = [images.banner1, images.banner2, images.banner3];

const styles = {
  root: {
    backgroundColor: '#e9efff',
    maxHeight: '2.5rem',
    overflow: 'hidden',
    padding: 0.3,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  banner: {
    img: {
      borderRadius: '3.125rem',
      display: 'block',
      minHeight: '1.875rem',
      margin: 'auto',
    },
  },
};

const Banner = () => {
  return (
    <Box sx={styles.root}>
      <Box className="container">
        <Box sx={styles.container}>
          {listBanner.map((banner, index) => (
            <Box sx={styles.banner} key={index}>
              <img src={banner} alt={`banner-${index}`} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
