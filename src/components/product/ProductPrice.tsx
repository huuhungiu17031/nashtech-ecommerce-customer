import { Typography, Grid, Button } from '@mui/material';
import { BoxWrapper } from '../common';
import { formatPrice } from '@/utils';
import { IconComponent } from '../partial';
import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@/services';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { successfullAlert } from '../alert';
import { useNavigate } from 'react-router-dom';

const styles = {
  boxWrapper: {
    padding: 1,
    boxShadow: 'none',
  },
  priceText: {
    color: '#d70018',
    display: 'inline-block',
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: 1.1,
    marginLeft: 1,
    marginBottom: 1,
  },
  buyNowButton: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 1,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  buyNowText: {
    fontSize: '1rem',
  },
  deliveryText: {
    fontSize: '0.625rem',
  },
  addToCartButton: {
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 1,
    color: 'red',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '1px solid #DF4041',
  },
  cartText: {
    fontSize: '0.4rem',
    marginTop: '0.3rem',
  },
};

export const ProductPrice = ({ price, id }: { price: number; id: number }) => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const mutationAddToCart = useMutation({
    mutationFn: ({ productId, amount = 1 }: { productId: number; amount: number }) => {
      return addToCart({ productId, amount });
    },
  });

  const handleAddToCart = (productId: number) => {
    const payload = { productId, amount: 1 };
    if (!isAuthenticated) {
      successfullAlert('You need to login').then(() => {
        navigate('/login');
      });
      return;
    }
    mutationAddToCart.mutate(payload);
  };

  return (
    <BoxWrapper sx={styles.boxWrapper}>
      <Typography>
        Giá:
        <Typography component={'span'} sx={styles.priceText}>
          {formatPrice({ price })}
        </Typography>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Button sx={styles.buyNowButton}>
            <Typography component={'strong'} sx={styles.buyNowText}>
              Mua ngay
            </Typography>
            <Typography component={'span'} sx={styles.deliveryText}>
              (Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button sx={styles.addToCartButton} onClick={() => handleAddToCart(id)}>
            <IconComponent iconName={'faCartPlus'} />
            <Typography component={'span'} sx={styles.cartText}>
              Thêm vào giỏ
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </BoxWrapper>
  );
};
