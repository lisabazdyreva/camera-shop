import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';

import {
  ProductItem,
  ReviewCard,
} from './components/components';
import {Modal} from '../../common/common';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCamera, fetchSimilarCameras} from '../../../store/actions/api-actions/api-actions-cameras';
import {AppDispatch} from '../../../types/action';
import {getCamera, getReviews, getSimilarCameras} from '../../../store/app-data/selectors';
import {fetchReviews} from '../../../store/actions/api-actions/api-actions-reviews';
import {ProductCard} from '../catalog/components/components';
import {ComponentName, ModalContent} from '../../../utils/const';



const Product = () => {
  const params = useParams();
  const {id} = params;

  const dispatch = useDispatch<AppDispatch>();

  const [isSuccessReviewModalOpen, setIsSuccessReviewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCamera(Number(id)));
    dispatch(fetchReviews(Number(id)));
    dispatch(fetchSimilarCameras(Number(id)));
  }, [id]);

  const camera = useSelector(getCamera);
  const reviews = useSelector(getReviews);
  const similarCameras = useSelector(getSimilarCameras);
  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <div className="page-content__section">
            {camera && <ProductItem data={camera}/>}
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                  <div className="product-similar__slider-list">
                    {

                      similarCameras.map((similarCamera, index) => (
                        <ProductCard
                          //TODO
                          //eslint-disable-next-line
                          handleAddModal={() => console.log('f')}
                          data={similarCamera}
                          key={similarCamera.id}
                          additionalClass={index < 3 ? 'is-active' : null}
                        />
                      ))
                    }
                  </div>
                  <button
                    className="slider-controls slider-controls--prev"
                    type="button"
                    aria-label="Предыдущий слайд"
                    disabled
                  >
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                  <button
                    className="slider-controls slider-controls--next"
                    type="button"
                    aria-label="Следующий слайд"
                  >
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button" onClick={() => setIsReviewModalOpen(true)}>Оставить свой отзыв</button>
                </div>
                <ul className="review-block__list">
                  {
                    reviews.map((review) => <ReviewCard key={review.id} data={review}/>)
                  }

                </ul>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов</button>
                </div>
              </div>
            </section>
          </div>
        </div>
        { isReviewModalOpen && <Modal usingComponent={ComponentName.Product} modalType={ModalContent.Action} handleCloseModal={setIsReviewModalOpen}/> }
        { isSuccessReviewModalOpen && <Modal usingComponent={ComponentName.Product} modalType={ModalContent.Info} handleCloseModal={setIsSuccessReviewModalOpen}/> }
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </>
  );
};

export default Product;
