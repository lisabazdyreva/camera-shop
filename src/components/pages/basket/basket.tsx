import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import UnknownSvg from '../../common/unknown-svg/unknown-svg';

import { BasketSummary, BasketItem } from './components/components';


//eslint-disable-next-line
const Basket = () => {
  return (
    <>
      <UnknownSvg/>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <Breadcrumbs />
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  <BasketItem />
                </ul>
                <BasketSummary />
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Basket;
