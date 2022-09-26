import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Pagination from '../../common/pagination/pagination';
import UnknownSvg from '../../common/unknown-svg/unknown-svg';

import {Banner, ProductCard, Sorting, SideFilter, AddProductModal, SuccessModal} from './components/components';

const isModalAddOpen = false;
const isModalSuccessOpen = false;
//eslint-disable-next-line
const Catalog = () => {
  return (
    <>
      <UnknownSvg />
      <div className="wrapper">
        <Header />
        <main>
          <Banner />
          <div className="page-content">
            <Breadcrumbs />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <SideFilter />
                  <div className="catalog__content">
                    <Sorting />
                    <div className="cards catalog__cards">
                      <ProductCard />
                    </div>
                    <Pagination />
                  </div>
                </div>
              </div>
            </section>
          </div>
          {isModalAddOpen && <AddProductModal />}
          {isModalSuccessOpen && <SuccessModal />}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Catalog;
