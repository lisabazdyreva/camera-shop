import './app.css';

import {Route, Routes} from 'react-router-dom';

import Catalog from '../pages/catalog/catalog';
import Product from '../pages/product/product';
import Basket from '../pages/basket/basket';
import NotFound from '../pages/not-found/not-found';
import {UnknownSvg, Header, Footer} from '../common/common';

import {AppRoute, PaginationRoute} from '../../utils/const';


const App = ():JSX.Element => (
  <>
    <UnknownSvg/>
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={`${AppRoute.Catalog}${PaginationRoute.Page}:pageNumber`} element={<Catalog />} />
        <Route path={AppRoute.Basket} element={<Basket/>} />
        <Route path={`${AppRoute.Product}/:id/:tab`} element={<Product />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </>
);

export default App;
