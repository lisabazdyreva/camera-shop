import './basket.css';

import {useState, useEffect} from 'react';

import {Breadcrumbs, WarningInfo, ModalInfo, ModalAction} from '../../common/common';
import {BasketSummary, BasketItem} from './components/components';
import {ReturnButton} from '../../common/modal-info/components/components';

import {ComponentName, BreadcrumbsItem, TopCoordinate, initialCamera, ModalActionName, ModalInfoName, WarningNotification} from '../../../utils/const';
import {useAppSelector} from '../../../hooks';
import {getBasket} from '../../../store/order/selectors';


const Basket = () :JSX.Element => {
  const [removingCamera, setRemovingCamera] = useState(initialCamera);

  const [isCameraRemoveModalOpen, setIsCameraRemoveModalOpen] = useState(false);
  const [isPostOrderModalOpen, setIsPostOrderModalOpen] = useState(false);

  const cameras = useAppSelector(getBasket);

  const emptyBasketWarning = <><WarningInfo text={WarningNotification.Basket}/><ReturnButton /></>;

  const handleCameraRemoveModalOpen = (id: number) => {
    const camera = cameras.find((item) => item.id === id);
    if (camera) {
      setRemovingCamera(camera);
    }
    setIsCameraRemoveModalOpen(true);
  };

  const handleCameraRemoveModalClose = () => {
    setIsCameraRemoveModalOpen(false);
  };

  const handlePostOrderModalClose = () => {
    setIsPostOrderModalOpen(false);
  };

  const handlePostOrderModalOpen = () => {
    setIsPostOrderModalOpen(true);
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
                cameras.map((camera, index) => {
                  if (index !== 0) {
                    const previousId = cameras[index - 1].id;
                    if (camera.id === previousId) {
                      return null;
                    }
                  }
                  return <BasketItem camera={camera} key={camera.id} onCameraRemoveModalOpen={handleCameraRemoveModalOpen}/>;
                })
              }
              {!cameras.length && emptyBasketWarning}
            </ul>
            <BasketSummary onPostOrderModalOpen={handlePostOrderModalOpen}/>
          </div>
        </section>
      </div>
      {isPostOrderModalOpen && <ModalInfo modalInfoType={ModalInfoName.OrderPost} onInfoModalClose={handlePostOrderModalClose}/> }
      {isCameraRemoveModalOpen &&
        <ModalAction data={removingCamera} onActionModalClose={handleCameraRemoveModalClose} modalActionType={ModalActionName.RemoveFromBasket}/>}
    </main>
  );
};

export default Basket;
