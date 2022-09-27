import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import UnknownSvg from '../../common/unknown-svg/unknown-svg';

import {
  BasketSummary,
  BasketItem
} from './components/components';

import {Modal} from '../../common/common';
import {useState} from 'react';

//eslint-disable-next-line
const Basket = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
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
                  <BasketItem handleOpenModal={setIsRemoveModalOpen} />
                </ul>
                <BasketSummary />
              </div>
            </section>
          </div>
        </main>
        { isSuccessModalOpen && <Modal modalType='basket' isModalDetailed={false} handleCloseModal={setIsSuccessModalOpen}/> }
        { isRemoveModalOpen && <Modal modalType='basket' isModalDetailed handleCloseModal={setIsRemoveModalOpen}/> }
        <Footer />
      </div>
    </>
  );
};

export default Basket;
