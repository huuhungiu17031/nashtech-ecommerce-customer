import { Box } from '@mui/material';

const BoxWrapper = ({ children, sx, ...unknownProperties }: any) => {
  const props = {
    ...unknownProperties,
  };
  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .1), 0 2px 6px 2px rgba(60, 64, 67, .15)',
        textAlign: 'justify',
        width: '100%',
        ...sx,
      }}>
      {children}
    </Box>
  );
};

export default BoxWrapper;
