import Catalog from '../pages/catalog/catalog';
import Product from '../pages/product/product';
import Basket from '../pages/basket/basket';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {AppRoute, PaginationRoute} from '../../utils/const';
import UnknownSvg from '../common/unknown-svg/unknown-svg';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';


const App = (): JSX.Element => (
  <BrowserRouter>
    <UnknownSvg/>
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path={`${AppRoute.Catalog}${PaginationRoute.Page}:pageNum`} element={<Catalog />}/>
        <Route path={AppRoute.Basket} element={<Basket/>} />
        <Route path={`${AppRoute.Product}/:id`} element={<Product />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
