import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Brand } from '.';
import { Box } from '@mui/joy';
import { ListProduct } from '../product';

const CategoryPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ field: 'price', dir: 'desc' });
  const paramsObject = Object.fromEntries(searchParams.entries());
  return (
    <Box>
      <Brand id={id} setSearchParams={setSearchParams} paramsObject={paramsObject} />
      <Filter setSearchParams={setSearchParams} searchParams={searchParams} />
      <ListProduct id={id} paramsObject={paramsObject} />
      {/* <button onClick={() => setSearchParams({ ...paramsObject, ram: '4GB' })}>RAM 4GB</button>
      <button onClick={() => setSearchParams({ ...paramsObject, ram: '8GB' })}>RAM 8GB</button> */}
    </Box>
  );
};

export default CategoryPage;
