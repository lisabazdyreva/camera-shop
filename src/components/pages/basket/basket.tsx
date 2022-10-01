import {Breadcrumbs} from '../../common/common';
import {
  BasketSummary,
  BasketItem
} from './components/components';

import {ModalInfo, ModalAction} from '../../common/common';
import {useState} from 'react';
import {ComponentName, BreadcrumbsItem} from '../../../utils/const';


const Basket = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  return (
    <main>
      <div className="page-content">
        <Breadcrumbs breadcrumbItems={BreadcrumbsItem.Basket} usingComponent={ComponentName.Basket}/>
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
      { isSuccessModalOpen && <ModalInfo usingComponent={ComponentName.Basket} handleCloseModal={setIsSuccessModalOpen}/> }
      { isRemoveModalOpen && <ModalAction usingComponent={ComponentName.Basket} handleCloseModal={setIsRemoveModalOpen}/> }
    </main>
  );
};

export default Basket;
