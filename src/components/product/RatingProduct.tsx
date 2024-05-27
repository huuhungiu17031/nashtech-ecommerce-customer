import { Box, Rating, Typography } from '@mui/material';
import { BoxWrapper } from '../common';
import { FormEvent, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { RatingBox } from './RatingBox';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface UserRating {
  comment: string;
  score: number;
  productId: number;
  createdBy: string;
}

export const RatingProduct = ({
  productName,
  isAuthenticated = false,
  userRating,
}: {
  productName: string;
  isAuthenticated: boolean;
  userRating: UserRating[];
}) => {
  const [value, setValue] = useState<number | null>(4);
  const handleSubmitRating = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };
  return (
    <BoxWrapper>
      <Box sx={{ padding: 1 }}>
        <Typography
          component={'p'}
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
          }}>{`Đánh giá & nhận xét ${productName}`}</Typography>
        {isAuthenticated && (
          <>
            <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
              }}>
              <Box component="form" onSubmit={handleSubmitRating} noValidate>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  size="large"
                  onChange={(_, newValue) => setValue(newValue)}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <button type="submit">SUBMIT</button>
              </Box>
            </Box>
          </>
        )}
      </Box>
      {userRating &&
        userRating.map((item: UserRating, index: number) => {
          return (
            <RatingBox
              key={index}
              comment={item.comment}
              score={item.score}
              email={item.createdBy}
            />
          );
        })}
    </BoxWrapper>
  );
};
