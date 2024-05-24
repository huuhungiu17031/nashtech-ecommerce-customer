import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  HomePage,
  Login,
  ShoppingCart,
  CategoryPage,
  ProductDetail,
} from "./components";
import { CART, LOGIN } from "./shared";
import { Checkout, DefaultLayout, RequireAuthenLayout } from "./layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path={LOGIN} element={<Login />} />
          <Route element={<RequireAuthenLayout />}>
            <Route path={CART} element={<ShoppingCart />} />
            <Route path="checkout/:id" element={<Checkout />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
