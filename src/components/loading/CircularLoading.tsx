import { Box, CircularProgress, styled } from '@mui/joy';

const DisabledBackground = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'fixed',
  background: '#ccc',
  opacity: 0.5,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
});

const CircularLoading = () => {
  return (
    <>
      <CircularProgress
        sx={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      />
      <DisabledBackground />
    </>
  );
};

export default CircularLoading;
