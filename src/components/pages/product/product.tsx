import {
  ProductItem,
  ReviewCard,
} from './components/components';
import {
  ModalInfo,
  ModalAction,
  Breadcrumbs
} from '../../common/common';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Slider} from './components/components';
import {ComponentName, BreadcrumbsItem} from '../../../utils/const';
import useProductDispatch from '../../../hooks/product-hooks/useProductDispatch';
import useProductSelectors from '../../../hooks/product-hooks/useProductSelectors';


const Product = () => {
  const params = useParams();
  const {id} = params;

  const [isSuccessReviewModalOpen, setIsSuccessReviewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useProductDispatch(Number(id));

  const {camera, reviews, similarCameras} = useProductSelectors();

  return (
    <>
      <main>
        <div className="page-content">
          {camera && <Breadcrumbs breadcrumbItems={BreadcrumbsItem.Product} data={camera} usingComponent={ComponentName.Product}/>}
          <div className="page-content__section">
            {camera && <ProductItem data={camera}/>}
          </div>
          {
            similarCameras.length &&
            <div className="page-content__section">
              <section className="product-similar">
                <div className="container">
                  <h2 className="title title--h3">Похожие товары</h2>
                  <Slider similarCameras={similarCameras} />
                </div>
              </section>
            </div>
          }
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
        { isReviewModalOpen && camera && <ModalAction data={camera} usingComponent={ComponentName.Product} handleOpenSuccessModal={setIsSuccessReviewModalOpen} handleCloseModal={setIsReviewModalOpen}/> }
        { isSuccessReviewModalOpen && <ModalInfo usingComponent={ComponentName.Product} handleCloseModal={setIsSuccessReviewModalOpen}/> }
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
