import ProductCard from './ProductCard';
import styles from '@/globalStyle/styles/list-product.module.scss';
import classNames from 'classnames/bind';
import { Box } from '@mui/joy';
import { ProductCardInterface } from '@/shared';
import { useGetProductCardVmsByCategoryId } from '@/services';
const cx = classNames.bind(styles);

const ListProduct = ({ id, paramsObject }: { id: string | undefined; paramsObject: any }) => {
  const { isLoading, data } = useGetProductCardVmsByCategoryId(
    id,
    paramsObject.order || '',
    paramsObject.dir || '',
    paramsObject.brandId || '',
  );
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Box className={cx('product-card-wrapper')}>
      {data.content.map((product: ProductCardInterface) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </Box>
  );
};

export default ListProduct;
