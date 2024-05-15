import { DynamicLink } from '@/components';
import images from '@/assets/images';
import { CART } from '@/shared';
// import { useKeycloak } from '@/context';
import { Box } from '@mui/joy';

const Navbar = () => {
  // const { isAuthenticated } = useKeycloak();
  const openModalLocation = () => {};
  const openModalLogin = () => {};
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '4rem',
        justifyContent: 'space-between',
        margin: '0 auto',
        padding: 0,
        width: '100%',
        backgroundColor: '#d70018',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }} className="container">
        <DynamicLink to={'/'} logo style={{ display: 'flex' }}>
          <img src={images.logo} alt="cellphones" />
        </DynamicLink>

        <DynamicLink icon={'faTableList'}>Danh mục</DynamicLink>

        <DynamicLink
          onClick={openModalLocation}
          icon={'faLocationDot'}
          subIcon={'faChevronDown'}
          locationValue={'Ho Chi Minh'}
          width={24}
          height={24}>
          Xem giá tại
        </DynamicLink>

        {/* SEARCH BAR */}
        <div style={{ flexGrow: 1 }}></div>
        {/* SEARCH BAR */}

        <DynamicLink icon={'faPhone'} width={24} height={24} hover>
          Gọi mua hàng <br /> 1800.2097
        </DynamicLink>

        <DynamicLink icon={'faLocationDot'} width={25} height={25} hover>
          Cửa hàng <br /> gần bạn
        </DynamicLink>

        <DynamicLink icon={'faTruck'} width={41} height={24} flipIcon hover>
          Tra cứu <br /> đơn hàng
        </DynamicLink>

        <DynamicLink icon={'faBagShopping'} width={25} height={25} hover to={CART}>
          Giỏ <br /> hàng
        </DynamicLink>

        <DynamicLink icon={'faUser'} smember onClick={openModalLogin}>
          Smember
        </DynamicLink>
      </Box>
    </Box>
  );
};

export default Navbar;
