import Catalog from '../pages/catalog/catalog';
import Product from '../pages/product/product';
import Basket from '../pages/basket/basket';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {AppRoute} from '../../types/const';


//eslint-disable-next-line
const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Catalog} element={<Catalog />}/>
        <Route path={AppRoute.Basket} element={<Basket/>} />
        <Route path={`${AppRoute.Product}/:id`} element={<Product />} />
      </Routes>

    </BrowserRouter>

  );
};

export default App;
