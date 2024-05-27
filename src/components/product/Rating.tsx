import { Box } from '@mui/material';
import { IconComponent } from '../partial';

export const Rating = ({ count }: { count: number }) => {
  return (
    <Box>
      {[...Array(count)].map((_, index) => (
        <IconComponent key={index} iconName={'faStar'} style={{ color: 'orange' }} />
      ))}
    </Box>
  );
};
