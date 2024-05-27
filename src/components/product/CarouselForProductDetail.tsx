import { ProductGalleryVm } from '@/shared';
import { CarouselCustom } from '../partial';
import { Box } from '@mui/material';
const styles = {
  imageContainer: {
    height: '20rem',
    display: 'flex',
    justifyContent: 'center',
  },
};
export const CarouselForProductDetail = ({
  imageUrlList,
}: {
  imageUrlList: ProductGalleryVm[];
}) => {
  const { imageContainer } = styles;
  return (
    <CarouselCustom>
      {imageUrlList.map((item: ProductGalleryVm) => {
        const { imagePath, id } = item;
        return (
          <Box key={id} sx={imageContainer}>
            <img src={imagePath} />
          </Box>
        );
      })}
    </CarouselCustom>
  );
};
