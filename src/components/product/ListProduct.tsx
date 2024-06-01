import ProductCard from './ProductCard';
import styles from '@/globalStyle/styles/list-product.module.scss';
import classNames from 'classnames/bind';
import { Box, TablePagination } from '@mui/material';
import { ProductCardInterface } from '@/shared';
import { useGetProductCardVmsByCategoryId } from '@/services';
import { CircularLoading } from '../loading';
const cx = classNames.bind(styles);

const ListProduct = ({
  id,
  paramsObject,
  setSearchParams,
}: {
  id: string | undefined;
  paramsObject: any;
  setSearchParams: any;
}) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setSearchParams({ ...paramsObject, page: newPage.toString() });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchParams({ ...paramsObject, size: event.target.value.toString() });
  };
  const { order, dir, brandId, page, size } = paramsObject;
  const { isLoading, data } = useGetProductCardVmsByCategoryId(
    id,
    order || '',
    dir || '',
    brandId || '',
    page || '0',
    size || '10',
  );
  if (isLoading) return <CircularLoading />;
  const { content, totalElements, size: responseSize, currentPage } = data;
  return (
    <>
      <Box className={cx('product-card-wrapper')}>
        {content.map((product: ProductCardInterface) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </Box>
      <TablePagination
        component="div"
        count={totalElements}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={responseSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListProduct;
