import { DynamicLink } from '@/components';
import { Box, Typography } from '@mui/joy';
const filterItems = [
  {
    children: 'Giá Cao - Thấp',
    icon: 'faArrowDownWideShort',
    field: 'price',
    dir: 'desc',
  },
  {
    children: 'Giá Thấp - Cao',
    icon: 'faArrowUpWideShort',
    field: 'price',
    dir: 'asc',
  },
];
const styles = {
  title: {
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: '0.3125rem',
    color: '#4a4a4a',
  },
  filterWapper: {
    display: 'flex',
  },
};
function Filter({
  setSearchParams,
  searchParams,
}: {
  setSearchParams: any;
  searchParams: URLSearchParams;
}) {
  const pOrder = searchParams.get('field');
  const pDir = searchParams.get('dir');
  const paramsObject = Object.fromEntries(searchParams.entries());

  const handleChooseFilter = (field: string, dir: string) => {
    setSearchParams({ ...paramsObject, field, dir });
  };
  return (
    <Box>
      <Box>
        <Typography sx={styles.title}>Chọn theo tiêu chí</Typography>
        <Box sx={styles.filterWapper}></Box>
      </Box>
      <Box>
        <Typography sx={styles.title}>Sắp xếp theo</Typography>
        <Box sx={styles.filterWapper}>
          {filterItems.map(item => {
            const { children, icon, dir, field } = item;
            const disabled = pDir === dir && field === pOrder;
            return (
              <DynamicLink
                disabled={disabled}
                key={icon}
                children={children}
                icon={icon}
                filter
                onClick={() => handleChooseFilter(field, dir)}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Filter;
