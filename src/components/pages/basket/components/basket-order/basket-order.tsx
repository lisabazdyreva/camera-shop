import './basket-order.css';

import {getFormattedPrice} from '../../../../../utils/utils';

interface BasketOrderProps {
  onOrderFormSubmit: () => void;
  price: number;
  discount: number;
  isCameras: number;
}

const BasketOrder = ({onOrderFormSubmit, price, discount, isCameras}: BasketOrderProps): JSX.Element => {
  const formattedPrice = getFormattedPrice(price);

  const discountFormattedPrice = getFormattedPrice(discount);
  const totalFormattedPrice = getFormattedPrice(price - discount);

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value" data-testid='total-price'>{formattedPrice}</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className="basket__summary-value basket__summary-value--bonus">{discountFormattedPrice}</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{totalFormattedPrice}</span>
      </p>
      <button className="btn btn--purple" type="submit" onClick={onOrderFormSubmit} disabled={!isCameras}>
        Оформить заказ
      </button>
    </div>
  );
};

export default BasketOrder;
