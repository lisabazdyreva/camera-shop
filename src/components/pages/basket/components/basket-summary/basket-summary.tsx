import './basket-summary.css';

import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../hooks';
import {postCouponAction, postOrderAction} from '../../../../../store/api-actions/api-actions-order/api-actions-order';
import {getBasket} from '../../../../../store/process/selectors';
//eslint-disable-next-line
import {Coupon} from '../../../../../types/order';
import {getCouponsPostStatus, getDiscount} from '../../../../../store/order/selectors';
import {LoadingStatus} from '../../../../../utils/const';
import {getFormattedPrice} from '../../../../../utils/utils';
import {cleanBasket} from '../../../../../store/process/process';
import {cleanDiscount} from '../../../../../store/order/order';

const CouponValidityStatus = {
  Valid: 'valid',
  Invalid: 'invalid',
  Default: 'default',
} as const;

const BasketSummary = () :JSX.Element => {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getBasket);
  const couponPostStatus = useAppSelector(getCouponsPostStatus);
  const discount = useAppSelector(getDiscount);

  const [promoCode, setPromoCode] = useState('');
  const [couponValidity, setCouponValidity] = useState<typeof CouponValidityStatus[keyof typeof CouponValidityStatus]>(CouponValidityStatus.Default);

  const handlePostOrderButtonClick = () => {
    const camerasIds = cameras.map((camera) => camera.id);
    const data = {
      camerasIds,
      coupon: couponValidity === CouponValidityStatus.Valid ? promoCode : null,
    };

    //eslint-disable-next-line
    console.log(data);
    dispatch(postOrderAction(data));
    dispatch(cleanBasket());
    setPromoCode('');
    dispatch(cleanDiscount());
    setCouponValidity(CouponValidityStatus.Default);
  };

  const handlePromoCodeSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const data: Coupon = {
      coupon: promoCode,
    };

    dispatch(postCouponAction(data));
  };

  const handlePromoCodeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(evt.target.value);
  };

  useEffect(() => {
    if (couponPostStatus === LoadingStatus.Success) {
      if (discount) {
        setCouponValidity(CouponValidityStatus.Valid);
      }
      if (!discount) {
        setCouponValidity(CouponValidityStatus.Invalid);
      }
    }
  }, [couponPostStatus, discount]);

  const customInputValidClasses = couponValidity === CouponValidityStatus.Valid && 'is-valid';
  const customInputInvalidClasses = couponValidity === CouponValidityStatus.Invalid && 'is-invalid';

  const price = cameras.reduce((prev, curr) => prev + curr.price, 0);
  const formattedPrice = getFormattedPrice(price);

  const discountPrice = discount && Math.ceil( price / 100 * discount);
  const discountFormattedPrice = discountPrice ? getFormattedPrice(discountPrice) : '0 ₽';

  const totalFormattedPrice = discountPrice ? getFormattedPrice(price - discountPrice) : formattedPrice;

  //eslint-disable-next-line
  console.log(promoCode);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4" data-testid='basket-summary-header'>Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form onSubmit={handlePromoCodeSubmit}>
            <div className={`custom-input ${customInputInvalidClasses || customInputValidClasses || ''}`}>
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  onChange={handlePromoCodeChange}
                  value={promoCode}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit" disabled={!cameras.length}>Применить</button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{formattedPrice}</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className="basket__summary-value basket__summary-value--bonus">{discountFormattedPrice}</span>{/*TODO посчитать*/}
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">{totalFormattedPrice}</span>{/*TODO посчитать*/}
        </p>
        <button
          className="btn btn--purple"
          type="submit"
          onClick={handlePostOrderButtonClick}
          disabled={!cameras.length}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );

};

export default BasketSummary;
