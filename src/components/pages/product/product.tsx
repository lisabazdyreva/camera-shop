import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import UnknownSvg from '../../common/unknown-svg/unknown-svg';

import {
  ProductItem,
  ProductSimilar,
  ReviewCard,
} from './components/components';
import {Modal} from '../../common/common';
import {useState} from 'react';


//eslint-disable-next-line
const Product = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  return (
    <>
      <UnknownSvg/>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <Breadcrumbs />
            <div className="page-content__section">
              <ProductItem />
            </div>
            <div className="page-content__section">
              <ProductSimilar />
            </div>
            <div className="page-content__section">
              <section className="review-block">
                <div className="container">
                  <div className="page-content__headed">
                    <h2 className="title title--h3">Отзывы</h2>
                    <button className="btn" type="button" onClick={() => setIsReviewModalOpen(true)}>Оставить свой отзыв</button>
                  </div>
                  <ul className="review-block__list">
                    <ReviewCard />
                  </ul>
                  <div className="review-block__buttons">
                    <button className="btn btn--purple" type="button">Показать больше отзывов</button>
                  </div>
                </div>
              </section>
            </div>
          </div>
          { isReviewModalOpen && <Modal modalType='product' isModalDetailed handleCloseModal={setIsReviewModalOpen}/> }
          { isSuccessModalOpen && <Modal modalType='product' isModalDetailed={false} handleCloseModal={setIsSuccessModalOpen}/>}
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        <Footer />
      </div>
    </>
  );
};

export default Product;
