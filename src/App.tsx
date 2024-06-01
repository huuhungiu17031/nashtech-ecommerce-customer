import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
  HomePage,
  Login,
  ShoppingCart,
  CategoryPage,
  ProductDetail,
  Register,
  ErrorPage,
} from './components';
import { CART, LOGIN } from './shared';
import { Checkout, DefaultLayout } from './layout';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path={LOGIN} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route element={<AuthOutlet fallbackPath={LOGIN} />}>
            <Route path={CART} element={<ShoppingCart />} />
            <Route path="checkout/:id" element={<Checkout />} />
          </Route>
          <Route path={'*'} element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
