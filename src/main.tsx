import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyle from './globalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context';
import AuthProvider from 'react-auth-kit';
const queryClient = new QueryClient();
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName: '_authCustomer',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle>
        <AppProvider>
          <App />
        </AppProvider>
      </GlobalStyle>
    </QueryClientProvider>
  </AuthProvider>,
);
