import './basket-promo.css';

import {ChangeEvent, FormEvent} from 'react';

import {CouponValidityStatus, LoadingStatus, PROMO_ERROR_NOTIFICATION, PROMO_WARNING_NOTIFICATION, ValidClass} from '../../../../../utils/const';
import {CouponValidityStatusType, LoadingStatusType} from '../../../../../types/types';


interface BasketPromoProps {
  isCameras: number;
  couponValidity: CouponValidityStatusType;
  onPromoCodeFormSubmit: (evt: FormEvent) => void;
  promoCode: string;
  onPromoCodeInputChange: (value: string) => void;
  couponPostStatus: LoadingStatusType;
}

const BasketPromo = ({isCameras, couponValidity, onPromoCodeFormSubmit, promoCode, onPromoCodeInputChange, couponPostStatus}: BasketPromoProps): JSX.Element => {
  const customInputValidClasses = couponValidity === CouponValidityStatus.Valid && ValidClass.Valid;
  const customInputInvalidClasses = couponValidity === CouponValidityStatus.Invalid && ValidClass.Invalid;

  const inputClasses = `custom-input ${customInputInvalidClasses || customInputValidClasses || ''}`;

  const handlePromoCodeInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onPromoCodeInputChange(evt.target.value);
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4" data-testid='basket-summary-header'>
        Если у вас есть промокод на скидку, примените его в этом поле
      </p>
      <div className="basket-form">
        <form onSubmit={onPromoCodeFormSubmit}>
          <div className={inputClasses}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="promo"
                placeholder="Введите промокод"
                onChange={handlePromoCodeInputChange}
                value={promoCode}
              />
            </label>
            <p className="custom-input__error">
              {couponPostStatus === LoadingStatus.Success ? PROMO_WARNING_NOTIFICATION : PROMO_ERROR_NOTIFICATION}
            </p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit" disabled={!isCameras}>Применить</button>

        </form>
      </div>
    </div>
  );
};

export default BasketPromo;
