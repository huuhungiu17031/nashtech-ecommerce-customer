import images from '@/assets/images';
import { Box } from '@mui/material';
const style = {
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  image: {
    width: '100%',
  },
};
export const ErrorPage = () => {
  return (
    <Box sx={style.image}>
      <img style={style.image} src={images.errorPageLogo} alt="" />
    </Box>
  );
};
