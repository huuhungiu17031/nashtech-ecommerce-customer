import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage, Login, ShoppingCart } from './components';
import { CART, LOGIN } from './shared';
import { DefaultLayout, RequireAuthenLayout } from './layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path={LOGIN} element={<Login />} />
          <Route element={<RequireAuthenLayout />}>
            <Route path={CART} element={<ShoppingCart />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
