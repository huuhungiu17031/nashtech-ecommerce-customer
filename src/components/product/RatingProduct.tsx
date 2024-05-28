import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { BoxWrapper } from '../common';
import { FormEvent, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { RatingBox } from './RatingBox';
import { successfullAlert } from '../alert';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRatingAndComment } from '@/services';
import { QUERY_KEYS } from '@/shared';

interface UserRating {
  comment: string;
  score: number;
  productId: number;
  createdBy: string;
}

export interface Rating {
  score: number | null;
  comment: string;
}

export interface RatingPayload extends Rating {
  productId: number;
}

const initialState: Rating = {
  score: 4,
  comment: '',
};

export const RatingProduct = ({
  productName,
  isAuthenticated = false,
  userRating,
  productId,
}: {
  productName: string;
  isAuthenticated: boolean;
  userRating: UserRating[];
  productId: number;
}) => {
  const [formRating, setFormRating] = useState(initialState);
  const queryClient = useQueryClient();

  const handleSubmitRating = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      productId,
      ...formRating,
    };
    mutationCommentAndRating.mutate(payload);
  };

  const mutationCommentAndRating = useMutation({
    mutationFn: (payload: RatingPayload) => createRatingAndComment(payload),
    onSuccess: data => {
      successfullAlert(data).then(() =>
        queryClient
          .invalidateQueries({
            queryKey: [QUERY_KEYS.useGetRatingFromUser, productId],
          })
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.useGetAverageRating, productId],
            });
          }),
      );
    },
  });

  const navigate = useNavigate();
  return (
    <BoxWrapper>
      <Box sx={{ padding: 1 }}>
        <Typography
          component={'p'}
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
          }}>{`Đánh giá & nhận xét ${productName}`}</Typography>
        {!isAuthenticated && (
          <Button
            variant="contained"
            onClick={() => {
              if (!isAuthenticated) {
                successfullAlert('You need to login').then(() => {
                  navigate('/login');
                });
              }
            }}>
            Đánh giá
          </Button>
        )}
        {isAuthenticated && (
          <>
            <Box>
              <form onSubmit={handleSubmitRating} noValidate>
                <Rating
                  name="hover-feedback"
                  value={formRating.score}
                  precision={0.5}
                  size="large"
                  onChange={(_, newScore) => setFormRating({ ...formRating, score: newScore })}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Box></Box>
                <TextField
                  id="outlined-textarea"
                  label="Comment"
                  placeholder="Placeholder"
                  multiline
                  sx={{ width: '100%' }}
                  onChange={e => setFormRating({ ...formRating, comment: e.target.value })}
                />
                <Box></Box>
                <Button variant="contained" type="submit" sx={{ mt: 1 }}>
                  SUBMIT
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
      {userRating && userRating.length > 0 ? (
        userRating.map((item: UserRating, index: number) => {
          return (
            <RatingBox
              key={index}
              comment={item.comment}
              score={item.score}
              email={item.createdBy}
            />
          );
        })
      ) : (
        <Typography component={'div'} textAlign={'center'} padding={2}>
          No comments for this product
        </Typography>
      )}
    </BoxWrapper>
  );
};
