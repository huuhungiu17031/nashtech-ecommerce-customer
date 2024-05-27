import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Brand } from '.';
import { Box } from '@mui/material';
import { ListProduct } from '../product';

const CategoryPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    field: 'price',
    dir: 'desc',
    page: '0',
    size: '10',
  });
  const paramsObject = Object.fromEntries(searchParams.entries());
  return (
    <Box>
      <Brand id={id} setSearchParams={setSearchParams} paramsObject={paramsObject} />
      <Filter setSearchParams={setSearchParams} searchParams={searchParams} />
      <ListProduct id={id} paramsObject={paramsObject} setSearchParams={setSearchParams} />
    </Box>
  );
};

export default CategoryPage;
