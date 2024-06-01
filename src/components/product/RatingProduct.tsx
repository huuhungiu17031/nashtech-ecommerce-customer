import { Box, Button, Divider, Modal, Rating, TextField, Typography } from '@mui/material';
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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const mutationCommentAndRating = useMutation({
    mutationFn: (payload: RatingPayload) => createRatingAndComment(payload),
    onSuccess: data => {
      handleClose();
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <BoxWrapper>
      <Box sx={{ padding: 2 }}>
        <Typography
          component={'div'}
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            marginBottom: 1,
          }}>{`Đánh giá & nhận xét ${productName}`}</Typography>
        <>
          <Divider />
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 20,
              flexDirection: 'column',
            }}>
            <Typography
              component={'div'}
              sx={{
                fontSize: '1rem',
                marginBottom: 1,
              }}>
              Bạn đánh giá sao về sản phẩm này?
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: '#D7000D', width: '10rem' }}
              onClick={() => {
                if (!isAuthenticated) {
                  successfullAlert('You need to login').then(() => {
                    navigate('/login');
                  });
                } else {
                  handleOpen();
                }
              }}>
              Đánh giá
            </Button>
          </Box>
          <Divider />
        </>
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
      {/* <Button onClick={}>Open modal</Button> */}

      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={{ ...style }}>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              <Typography id="modal-modal-title" sx={{ fontSize: '20px' }}>
                Đánh giá & nhận xét
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>
                {productName}
              </Typography>
              <Typography sx={{ fontWeight: 'bold' }}>Đánh giá chung</Typography>
              <Box>
                <Box>
                  <form onSubmit={handleSubmitRating} noValidate>
                    <Rating
                      name="hover-feedback"
                      value={formRating.score}
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
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mt: 1, width: '100%', backgroundColor: '#D7000D' }}>
                      GỬI ĐÁNH GIÁ
                    </Button>
                  </form>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </BoxWrapper>
  );
};
