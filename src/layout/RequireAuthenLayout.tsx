import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuthenLayout = () => {
  const location = useLocation();
  return true ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuthenLayout;
