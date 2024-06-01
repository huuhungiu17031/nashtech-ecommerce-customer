import { deleteCartDetailById, useGetProductGalleryInCart } from '@/services';
import { formatPrice } from '@/utils';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IconComponent } from '../partial';
import { useAuthen } from '@/context';
import { Product, QUERY_KEYS } from '@/shared';
const styles = {
  priceText: {
    color: '#d70018',
    display: 'inline-block',
    fontSize: '18px',
    lineHeight: 1.1,
    marginTop: '1rem',
  },
  cart: {
    backgroundColor: 'white',
    borderRadius: 1,
    marginTop: 2,
    border: '1px solid rgb(229,232,234)',
  },
};
export const ProductCart = ({ cartDetail }: { cartDetail: Product }) => {
  const { cart, priceText } = styles;
  const queryClient = useQueryClient();
  const { id, amount, cartId, productName, price } = cartDetail;
  const { data: productGallery } = useGetProductGalleryInCart(id);
  const { email } = useAuthen();

  const mutationDeleteCartDetail = useMutation({
    mutationFn: async (cartDetailId: number) => deleteCartDetailById(cartDetailId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.useGetCartDetailByCartId, email],
      });
    },
  });

  if (productGallery) {
    const { imagePath } = productGallery;
    return (
      <Box sx={cart}>
        <Box sx={{ padding: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <img src={imagePath} alt="" width={'100%'} />
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography component={'div'}>{productName}</Typography>
                <Typography sx={priceText} component={'div'}>
                  {formatPrice({ price })}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              {amount}
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="delete"
                onClick={() => mutationDeleteCartDetail.mutate(cartId)}>
                <IconComponent iconName="faTrash" />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginX: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'start',
                  paddingY: 2,
                }}>
                <IconComponent iconName={'faShieldHalved'} />
                <Typography sx={{ marginLeft: 1 }}>
                  Bảo vệ toàn diện với Bảo hành mở rộng{' '}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
};
