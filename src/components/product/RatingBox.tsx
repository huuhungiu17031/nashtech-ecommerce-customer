import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Rating } from './Rating';
import { getRandomColor } from '@/utils';

export const RatingBox = ({
  score,
  comment,
  email,
}: {
  score: number;
  comment: string;
  email: string;
}) => {
  const bgcolor = getRandomColor();
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor }}>{email[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={email}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary">
                {comment}
              </Typography>
            </>
          }
        />
        <ListItemIcon>
          <Rating count={score} />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};
