import './product.css';

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {ProductContent} from './components/components';
import {ModalInfo, ModalAction} from '../../common/common';

import {ScrollSetting, TopCoordinate, initialCamera, ModalActionName, ModalInfoName} from '../../../utils/const';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {Camera} from '../../../types/camera';

import {fetchCameraAction, fetchSimilarCamerasAction} from '../../../store/api-actions/api-actions-cameras/api-actions-cameras';
import {fetchReviewsAction} from '../../../store/api-actions/api-actions-reviews/api-actions-reviews';
import {getCamera} from '../../../store/camera/selectors';


const Product = ():JSX.Element => {
  const dispatch = useAppDispatch();

  const [isReviewEditModalOpen, setIsReviewEditModalOpen] = useState(false);
  const [isPostReviewModalOpen, setIsPostReviewModalOpen] = useState(false);

  const [isCameraAddModalOpen, setIsCameraAddModalOpen] = useState(false);
  const [isCameraAddedSuccessModalOpen, setIsCameraAddedSuccessModalOpen] = useState(false);

  const [selectedCamera, setSelectedCamera] = useState(initialCamera);

  const params = useParams();
  const {id} = params;
  const camera = useAppSelector(getCamera);

  const handleToTopButtonClick = () => {
    window.scrollTo(ScrollSetting);
  };

  const handleEditReviewModalOpen = () => {
    setIsReviewEditModalOpen(true);
  };

  const handleEditReviewModalClose = () => {
    setIsReviewEditModalOpen(false);
  };

  const handlePostReviewModalOpen = () => {
    setIsPostReviewModalOpen(true);
  };

  const handlePostReviewModalClose = () => {
    setIsPostReviewModalOpen(false);
  };

  const handleAddToBasketModalClose = () => {
    setIsCameraAddModalOpen(false);
  };

  const handleCameraAddedSuccessModalOpen = () => {
    setIsCameraAddedSuccessModalOpen(true);
  };

  const handleCameraAddedSuccessModalClose = () => {
    setIsCameraAddedSuccessModalOpen(false);
  };

  const handleCameraAddToBasket = (data: Camera) => {
    setSelectedCamera(data);
    setIsCameraAddModalOpen(true);
  };

  useEffect(() => {
    if (id) {
      const numberId = Number(id);
      const data = {id: numberId};

      dispatch(fetchCameraAction(data));
      dispatch(fetchReviewsAction(data));
      dispatch(fetchSimilarCamerasAction(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    window.scrollTo(TopCoordinate.X, TopCoordinate.Y);
  }, []);

  return (
    <>
      <main>
        <ProductContent camera={camera} onCameraAddToBasket={handleCameraAddToBasket} onButtonAddReviewClick={handleEditReviewModalOpen}/>

        {isReviewEditModalOpen && camera
          &&
          <ModalAction
            data={camera}
            onInfoModalOpen={handlePostReviewModalOpen}
            onActionModalClose={handleEditReviewModalClose}
            modalActionType={ModalActionName.AddReview}
          />}
        {isPostReviewModalOpen && <ModalInfo modalInfoType={ModalInfoName.ReviewPost} onInfoModalClose={handlePostReviewModalClose}/>}

        {isCameraAddModalOpen && camera &&
          <ModalAction
            data={selectedCamera}
            onActionModalClose={handleAddToBasketModalClose}
            onInfoModalOpen={handleCameraAddedSuccessModalOpen}
            modalActionType={ModalActionName.AddToBasket}
          />}
        {isCameraAddedSuccessModalOpen && <ModalInfo modalInfoType={ModalInfoName.AddedToBasket} onInfoModalClose={handleCameraAddedSuccessModalClose}/>}

      </main>
      <button className="up-btn" type='button' onClick={handleToTopButtonClick}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
    </>
  );
};

export default Product;
