import {Picture} from '../../../../common/common';

interface BasketItemProps {
  handleOpenModal: (isOpen: boolean) => void;
}


const BasketItem = ({handleOpenModal}: BasketItemProps):JSX.Element => (
  <li className="basket-item">
    <div className="basket-item__img">
      <Picture
        width={140}
        height={120}
        alt={'Фотоаппарат «Орлёнок»'}
        src={'img/content/img9.jpg'}
        srcSetImg={'img/content/img9@2x.jpg'}
        srcSetSource={['img/content/img9.webp', 'img/content/img9@2x.webp']}
      />
    </div>
    <div className="basket-item__description">
      <p className="basket-item__title">Фотоаппарат «Орлёнок»</p>
      <ul className="basket-item__list">
        <li className="basket-item__list-item">
          <span className="basket-item__article">Артикул:</span>
          <span className="basket-item__number">O78DFGSD832</span>
        </li>
        <li className="basket-item__list-item">Плёночная фотокамера</li>
        <li className="basket-item__list-item">Любительский уровень</li>
      </ul>
    </div>
    <p className="basket-item__price">
      <span className="visually-hidden">Цена:</span>18 970 ₽
    </p>
    <div className="quantity">
      <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter1"></label>
      <input type="number" id="counter1" min="1" max="99" aria-label="количество товара" /> {/*TODO value="2" */}
      <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
    <div className="basket-item__total-price">
      <span className="visually-hidden">Общая цена:</span>37 940 ₽
    </div>
    <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={() => handleOpenModal(true)}>
      <svg width="10" height="10" aria-hidden="true">
        <use xlinkHref="#icon-close"></use>
      </svg>
    </button>
  </li>
);


export default BasketItem;
