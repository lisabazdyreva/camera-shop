import './basket-summary.css';

import {FormEvent, useEffect, useState} from 'react';
import {BasketOrder, BasketPromo} from '../components';

import {useAppDispatch, useAppSelector} from '../../../../../hooks';
import {LoadingStatus, CouponValidityStatus} from '../../../../../utils/const';
import {CouponValidityStatusType} from '../../../../../types/types';

import {postCouponAction, postOrderAction} from '../../../../../store/api-actions/api-actions-order/api-actions-order';
import {getBasket, getOrderPostStatus} from '../../../../../store/order/selectors';
import {getCouponsPostStatus, getDiscount} from '../../../../../store/order/selectors';


interface BasketSummaryProps {
  onPostOrderModalOpen: () => void;
}

const BasketSummary = ({onPostOrderModalOpen}: BasketSummaryProps) :JSX.Element => {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(getBasket);
  const discount = useAppSelector(getDiscount);

  const couponPostStatus = useAppSelector(getCouponsPostStatus);
  const orderPostStatus = useAppSelector(getOrderPostStatus);

  const [promoCode, setPromoCode] = useState('');
  const [couponValidity, setCouponValidity] = useState<CouponValidityStatusType>(CouponValidityStatus.Default);

  const price = cameras.reduce((accum, camera) => accum + camera.price, 0);
  const discountPrice = discount ? Math.ceil( price / 100 * discount) : 0;

  const handlePromoCodeInputChange = (value: string) => {
    setPromoCode(value);
  };

  const handlePromoCodeFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postCouponAction({coupon: promoCode.trim()}));
  };

  const handleOrderFormSubmit = () => {
    const camerasIds = cameras.map((camera) => camera.id);
    const coupon = couponValidity === CouponValidityStatus.Valid ? promoCode : null;

    dispatch(postOrderAction({camerasIds, coupon})).then(() => {
      onPostOrderModalOpen();
      if (orderPostStatus === LoadingStatus.Success) {
        setPromoCode('');
        setCouponValidity(CouponValidityStatus.Default);
      }
    });
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
    if (couponPostStatus === LoadingStatus.Error) {
      setCouponValidity(CouponValidityStatus.Invalid);
    }
  }, [couponPostStatus, discount]);

  return (
    <div className="basket__summary">
      <BasketPromo
        promoCode={promoCode}
        onPromoCodeInputChange={handlePromoCodeInputChange}
        couponValidity={couponValidity}
        onPromoCodeFormSubmit={handlePromoCodeFormSubmit}
        isCameras={cameras.length}
        couponPostStatus={couponPostStatus}
      />
      <BasketOrder
        price={price}
        discount={discountPrice}
        onOrderFormSubmit={handleOrderFormSubmit}
        isCameras={cameras.length}
      />
    </div>
  );
};

export default BasketSummary;
