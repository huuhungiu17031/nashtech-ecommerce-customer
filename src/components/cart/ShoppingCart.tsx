import { Box, Button, Grid, Typography } from '@mui/material';
import { DynamicLink, IconComponent } from '../partial';
import { checkout, useGetCartDetailByCartId } from '@/services';
import { CircularLoading } from '../loading';
import { useMutation } from '@tanstack/react-query';
import { CheckOutData, OrderDetailVm, Product } from '@/shared';
import { NoProductInCart } from './NoProductInCart';
import { ProductCart } from './ProductCart';
import { useAuthen } from '@/context';
import { formatPrice } from '@/utils';

const styles = {
  shoppingCartWrapper: {
    color: '#323232',
    margin: 'auto',
    padding: '0.625rem',
  },

  blockInfo: {
    borderRadius: '10px',
    margin: 'auto auto 20px',
    maxWidth: '600px',
    padding: 0,
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: '0.5rem',
  },

  total: {
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 1,
    marginTop: 2,
    border: '1px solid rgb(229,232,234)',
  },
};

const ShoppingCart = () => {
  const { shoppingCartWrapper, title, total } = styles;

  const mutationCheckout = useMutation({
    mutationFn: (data: CheckOutData) => checkout(data),
    onSuccess: (data: any) => {
      // @ts-ignore
      window.location.href = data.url;
    },
  });
  const { email } = useAuthen();
  const {
    data: cartDetails,
    isLoading,
    isSuccess: isSuccessCardDetail,
  } = useGetCartDetailByCartId(email);

  const handleCheckOut = async () => {
    if (cartDetails) {
      const orderDetailVms = cartDetails.map((item: Product) => {
        const { id: productId, amount } = item;
        const orderDetailVms: OrderDetailVm = {
          productId,
          amount,
        };
        return orderDetailVms;
      });
      const payload: CheckOutData = {
        paymentMethod: 'VN_PAY',
        orderDetailVms,
      };
      mutationCheckout.mutate(payload);
    }
  };

  if (isLoading) return <CircularLoading />;
  if (cartDetails && isSuccessCardDetail) {
    const totalMoney = cartDetails.reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.price * currentValue.amount,
      0,
    );
    return (
      <Box>
        <Box sx={title}>
          <DynamicLink to={'/'}>
            <IconComponent iconName={'faArrowLeft'} />
          </DynamicLink>
          <Typography sx={{ fontWeight: 'bold' }} component={'div'}>
            Giỏ hàng của bạn
          </Typography>
          <Box></Box>
        </Box>
        {cartDetails && cartDetails.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Box sx={shoppingCartWrapper}>
                {cartDetails.map((item: Product) => (
                  <ProductCart key={item.cartId} cartDetail={item} />
                ))}
                <Button sx={{ marginTop: 1 }} onClick={handleCheckOut}>
                  CHECKOUT
                </Button>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box sx={shoppingCartWrapper}>
                <Box sx={total}>Total: {formatPrice({ price: totalMoney })}</Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <NoProductInCart />
        )}
      </Box>
    );
  }
};

export default ShoppingCart;
