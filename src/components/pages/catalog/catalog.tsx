import Header from '../../common/header/header';
import Footer from '../../common/footer/footer';
import Breadcrumbs from '../../common/breadcrumbs/breadcrumbs';
import Pagination from '../../common/pagination/pagination';
import UnknownSvg from '../../common/unknown-svg/unknown-svg';

import {
  Banner,
  ProductCard,
  Sorting,
  SideFilter,
} from './components/components';
import {Modal} from '../../common/common';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getCameras} from '../../../store/app-data/selectors';
import {initialCamera} from '../../../types/const';
import {Camera} from '../../../types/types';


const Catalog = () => {
  const [selectedCameraData, setSelectedCameraData] = useState(initialCamera);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  const cameras = useSelector(getCameras);

  const handleAddModal = (data: Camera) => {
    setIsModalAddOpen(true);
    setSelectedCameraData(data);
  };

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
                      {
                        cameras.map((camera) => <ProductCard key={camera.id} handleAddModal={handleAddModal} data={camera} />)
                      }

                    </div>
                    <Pagination />
                  </div>
                </div>
              </div>
            </section>
          </div>
          {isModalAddOpen
            && <Modal
              data={selectedCameraData}
              modalType='catalog'
              isModalDetailed
              handleCloseModal={setIsModalAddOpen}
              handleOpenSuccessModal={setIsModalSuccessOpen}
              />
          }
          {isModalSuccessOpen && <Modal modalType='catalog' isModalDetailed={false} handleCloseModal={setIsModalSuccessOpen}/>}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Catalog;
