import {
  useGetAverageRating,
  useGetProductDetail,
  useGetProductGalleryVmByProductId,
  useGetRatingFromUser,
} from '@/services';
import { Box, Rating, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CircularLoading } from '../loading';
import { useState } from 'react';
import { useClear } from '@/hook';
import { ProductPrice } from './ProductPrice';
// import { Rating } from './Rating';
import { CarouselForProductDetail } from './CarouselForProductDetail';
import { ProductDescription } from './ProductDescription';
import { RatingProduct } from './RatingProduct';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

const styles = {
  title: {
    fontSize: '1.125rem',
    fontWeight: 700,
    margin: '0 10px 0 0',
    color: '#0a263c',
  },
  divider: {
    margin: '10px 0 15px',
    backgroundColor: '#f5f5f5',
    height: '2px',
    border: 'none',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    marginTop: '1rem',
    gap: 2,
  },
};

const ProductDetail = () => {
  const { title, divider, gridContainer } = styles;
  const { id } = useParams();
  const productId = parseInt(id || '0', 10);
  // @ts-ignore
  const { isLoading: isLoadingProduct, data: productDetail } = useGetProductDetail(id);
  const { isLoading: isLoadingImage, data: imageUrlList } = useGetProductGalleryVmByProductId(id);
  const { data: userRating } = useGetRatingFromUser(productId);
  const { isLoading: isLoadingAverage, data: averageRating } = useGetAverageRating(productId);
  const [overflow, setOverFlow] = useState(true);
  useClear(() => {
    setOverFlow(true);
  });
  const isAuthenticated = useIsAuthenticated();
  if (isLoadingProduct && isLoadingImage && isLoadingAverage) return <CircularLoading />;
  if (productDetail && imageUrlList) {
    const { productName, price, description, id } = productDetail;
    return (
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={title}>{productName}</Typography>
          <Rating name="read-only" value={averageRating} readOnly />
        </Box>
        <hr style={divider} />
        <Box sx={gridContainer}>
          <CarouselForProductDetail imageUrlList={imageUrlList} />
          <ProductPrice price={price} id={id} />
          <ProductDescription
            description={description}
            overflow={overflow}
            handleOverFlow={() => setOverFlow(!overflow)}
          />
          <Box></Box>
          <RatingProduct
            productName={productName}
            isAuthenticated={isAuthenticated}
            userRating={userRating}
            productId={id}
          />
        </Box>
      </Box>
    );
  }
};
export default ProductDetail;
