import images from '@/assets/images';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const styles = {
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
  nothingInCart: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    padding: '100px 0',
    textAlign: 'center',
  },
};
export const NoProductInCart = () => {
  const { nothingInCart, buyNowButton, buyNowText } = styles;
  const navigate = useNavigate();
  return (
    <>
      <Box sx={nothingInCart}>
        <img src={images.cartLogo} />
        <Typography component={'span'} sx={{ marginY: 3 }}>
          Giỏ hàng của bạn đang trống. <br />
          Hãy chọn thêm sản phẩm để mua sắm nhé
        </Typography>
      </Box>
      <Box>
        <Button sx={buyNowButton} onClick={() => navigate('/')}>
          <Typography component={'strong'} sx={buyNowText}>
            Mua ngay
          </Typography>
        </Button>
      </Box>
    </>
  );
};
