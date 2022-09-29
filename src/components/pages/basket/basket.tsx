import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import {
  BasketSummary,
  BasketItem
} from './components/components';

import {Modal} from '../../common/common';
import {useState} from 'react';
import {ComponentName, ModalContent, BreadcrumbsItem} from '../../../utils/const';


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
      { isSuccessModalOpen && <Modal usingComponent={ComponentName.Basket} modalType={ModalContent.Info} handleCloseModal={setIsSuccessModalOpen}/> }
      { isRemoveModalOpen && <Modal usingComponent={ComponentName.Basket} modalType={ModalContent.Action} handleCloseModal={setIsRemoveModalOpen}/> }
      {/*TODO  remove magic values*/}
    </main>
  );
};

export default Basket;
