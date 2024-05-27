import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuthenLayout = ({ children }: any) => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuthenLayout;
