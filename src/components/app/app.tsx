import Catalog from '../pages/catalog/catalog';
import Product from '../pages/product/product';
import Basket from '../pages/basket/basket';
import {
  Route,
  Routes
} from 'react-router-dom';
import {
  AppRoute,
  PaginationRoute}
  from '../../utils/const';
import {UnknownSvg, Header, Footer} from '../common/common';
import NotFound from '../pages/not-found/not-found';


const App = (): JSX.Element => (
  <>
    <UnknownSvg/>
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={`${AppRoute.Catalog}${PaginationRoute.Page}:pageNum`} element={<Catalog />} />
        <Route path={AppRoute.Basket} element={<Basket/>} />
        <Route path={`${AppRoute.Product}/:id/:tab`} element={<Product />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </>
);
//TODO think of hooks, data structures
export default App;
