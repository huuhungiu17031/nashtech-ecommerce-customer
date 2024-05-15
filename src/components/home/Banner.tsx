import images from '@/assets/images';
import { Box } from '@mui/joy';
const listBanner = [images.banner1, images.banner2, images.banner3];

const Banner = () => {
  return (
    <Box sx={{ backgroundColor: '#e9efff', maxHeight: '2.5rem', overflow: 'hidden', padding: 0.3 }}>
      <Box className="container">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {listBanner.map((banner, index) => (
            <Box
              sx={{
                img: {
                  borderRadius: '3.125rem',
                  display: 'block',
                  minHeight: '1.875rem',
                  margin: 'auto',
                },
              }}
              key={index}>
              <img src={banner} alt={index.toString()} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
