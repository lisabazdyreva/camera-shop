import {Breadcrumbs} from '../../common/common';
import {
  BasketSummary,
  BasketItem
} from './components/components';

import {ModalInfo, ModalAction} from '../../common/common';
import {useState, useEffect} from 'react';
import {ComponentName, BreadcrumbsItem, TopCoordinate} from '../../../utils/const';


const Basket = ():JSX.Element => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(TopCoordinate.X, TopCoordinate.Y);
  }, []);

  return (
    <main>
      <div className="page-content">
        <Breadcrumbs breadcrumbItems={BreadcrumbsItem.Basket} usingComponent={ComponentName.Basket}/>
        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              <BasketItem onModalOpen={() => setIsRemoveModalOpen(true)} />
            </ul>
            <BasketSummary />
          </div>
        </section>
      </div>
      {isSuccessModalOpen && <ModalInfo usingComponent={ComponentName.Basket} onModalClose={() => setIsSuccessModalOpen(false)}/> }
      {isRemoveModalOpen && <ModalAction usingComponent={ComponentName.Basket} onModalClose={() => setIsRemoveModalOpen(false)}/> }
    </main>
  );
};

export default Basket;
