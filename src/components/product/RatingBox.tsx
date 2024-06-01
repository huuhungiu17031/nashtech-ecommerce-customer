import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Rating,
} from '@mui/material';

export const RatingBox = ({
  score,
  comment,
  email,
}: {
  score: number;
  comment: string;
  email: string;
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>{email[0]}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={email}
          secondary={
            <>
              <Rating
                size="small"
                name="half-rating"
                defaultValue={score}
                precision={0.5}
                readOnly
              />

              <Typography component="div" variant="body2" color="text.primary">
                {comment}
              </Typography>
            </>
          }
        />
      </ListItem>
    </List>
  );
};
