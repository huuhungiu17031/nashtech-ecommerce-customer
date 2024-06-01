import { createContext, useContext, useEffect, useState } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import { autoFetch } from '@/services';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export interface AuthStateInterface {
  accessToken: string | null;
  refreshToken: string | null;
  email: string;
  userId: number;
  isAuthenticated: boolean;
}
interface ContextInterface extends AuthStateInterface {
  setAuth: (accessToken: string, refreshToken: string) => void;
}

const AppContext = createContext<ContextInterface | undefined>(undefined);

const exemptedUrls = ['category', 'product', 'rating'];

const checkMethodAndUrlInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.method === 'get' && config.url && exemptedUrls.includes(config.url)) {
    delete config.headers.Authorization;
  }
  return config;
};

interface UserInfor {
  email: string;
  userId: number;
}

const AppProvider = ({ children }: any) => {
  const initState = {
    accessToken: '',
    refreshToken: '',
    email: '',
    userId: 0,
    isAuthenticated: false,
  };
  const [state, setStateContext] = useState<AuthStateInterface>(initState);
  const bearerToken = 'Bearer ' + state.accessToken;
  autoFetch.defaults.headers.common['Authorization'] = bearerToken;
  autoFetch.interceptors.request.use(
    config => checkMethodAndUrlInterceptor(config),
    function (error) {
      return Promise.reject(error);
    },
  );
  const authHeader = useAuthHeader();
  const auth = useAuthUser<UserInfor>();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    let currentState = { ...state };
    if (auth) {
      currentState = { ...currentState, email: auth.email, userId: auth.userId };
    }
    if (authHeader) {
      const accessToken = authHeader.split(' ')[1].toString();
      currentState = { ...currentState, accessToken };
    }
    if (isAuthenticated) {
      currentState = { ...currentState, isAuthenticated };
    }
    setStateContext(currentState);
  }, [auth, authHeader]);

  const setAuth = (accessToken: string, refreshToken: string) => {
    setStateContext({ ...state, accessToken, refreshToken });
  };

  autoFetch.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
      }
      if (error.response.status === 403) {
      }
      if (error.response.status === 11000) {
      }
      return Promise.reject(error);
    },
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        setAuth,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAuthen = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAuthen must be used within a AppProvider');
  }
  return context;
};

export { useAuthen, AppProvider };
