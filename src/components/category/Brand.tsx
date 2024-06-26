import { Box } from '@mui/material';
import { BrandVm } from '@/shared';
import { useGetBrandsByCategoryId } from '@/services';
import { DynamicLink } from '../partial';

const styles = {
  box: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 2fr)',
    gap: 1,
  },
  dynamicLink: {
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    margin: '0 10px 10px 0',
    padding: '2px 4px',
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
};

const Brand = ({
  id,
  setSearchParams,
  paramsObject,
}: {
  id: string | undefined;
  setSearchParams: any;
  paramsObject: any;
}) => {
  const { isLoading, data } = useGetBrandsByCategoryId(id);
  const handleChangeBrand = (id: number) => {
    setSearchParams({ ...paramsObject, brandId: id });
  };
  if (isLoading) return <h1>Loading...</h1>;
  if (data) {
    const { box, dynamicLink, imageWrapper, image } = styles;
    return (
      <Box sx={box}>
        {data.map((brand: BrandVm) => {
          const { id, imagePath, name } = brand;
          return (
            <DynamicLink key={id} style={dynamicLink} onClick={() => handleChangeBrand(brand.id)}>
              <Box sx={imageWrapper}>
                <img src={imagePath} style={image} alt={name} />
              </Box>
            </DynamicLink>
          );
        })}
      </Box>
    );
  }
};

export default Brand;
