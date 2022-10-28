import './basket.css';

import {useState, useEffect} from 'react';

import {Breadcrumbs} from '../../common/common';
import {BasketSummary, BasketItem} from './components/components';

import {ModalInfo, ModalAction} from '../../common/common';
import {ComponentName, BreadcrumbsItem, TopCoordinate, initialCamera} from '../../../utils/const';
import {useAppSelector} from '../../../hooks';
import {getBasket} from '../../../store/process/selectors';

//TODO basket to cart
const Basket = () :JSX.Element => {
  const [removingCamera, setRemovingCamera] = useState(initialCamera);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const cameras = useAppSelector(getBasket);

  const handleModalOpen = (id: number) => {
    const camera = cameras.find((item) => item.id === id);
    if (camera) {
      setRemovingCamera(camera);
    }
    setIsRemoveModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleModalClose = () => {
    setIsRemoveModalOpen(false);
  };

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
              {
                cameras
                  .map((camera, index) => {
                    if (index !== 0) {
                      const previousId = cameras[index - 1].id;
                      if (camera.id === previousId) {
                        return;
                      }
                    }
                    return <BasketItem camera={camera} key={camera.id} onModalOpen={handleModalOpen} />;
                  })
              }
            </ul>
            <BasketSummary />
          </div>
        </section>
      </div>
      {isSuccessModalOpen && <ModalInfo usingComponent={ComponentName.Basket} onModalClose={handleSuccessModalClose}/> }
      {isRemoveModalOpen &&
        <ModalAction
          data={removingCamera}
          usingComponent={ComponentName.Basket}
          onModalClose={handleModalClose}
        />}
    </main>
  );
};

export default Basket;
