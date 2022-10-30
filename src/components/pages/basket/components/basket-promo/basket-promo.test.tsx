import {render, screen} from '@testing-library/react';

import {BasketPromo} from '../components';
import {CouponValidityStatus, LoadingStatus} from '../../../../../utils/const';

describe('basket promo component', () => {
  it('should render correctly', () => {
    render(
      <BasketPromo
        isCameras={0}
        couponValidity={CouponValidityStatus.Default}
        onPromoCodeFormSubmit={jest.fn}
        promoCode={''}
        onPromoCodeInputChange={jest.fn}
        couponPostStatus={LoadingStatus.Default}
      />
    );
    expect(screen.getByText(/Если у вас есть промокод/i)).toBeInTheDocument();
  });

  it('should render correctly when coupon valid and loaded', () => {
    render(
      <BasketPromo
        isCameras={0}
        couponValidity={CouponValidityStatus.Valid}
        onPromoCodeFormSubmit={jest.fn}
        promoCode={''}
        onPromoCodeInputChange={jest.fn}
        couponPostStatus={LoadingStatus.Success}
      />
    );
    expect(screen.getByText(/Промокод принят!/i)).toBeInTheDocument();
  });

  it('should render correctly when coupon is not valid', () => {
    render(
      <BasketPromo
        isCameras={0}
        couponValidity={CouponValidityStatus.Invalid}
        onPromoCodeFormSubmit={jest.fn}
        promoCode={''}
        onPromoCodeInputChange={jest.fn}
        couponPostStatus={LoadingStatus.Success}
      />
    );
    expect(screen.getByText(/Промокод неверный/i)).toBeInTheDocument();
  });

  it('should render correctly when promo code post error', () => {
    render(
      <BasketPromo
        isCameras={0}
        couponValidity={CouponValidityStatus.Invalid}
        onPromoCodeFormSubmit={jest.fn}
        promoCode={''}
        onPromoCodeInputChange={jest.fn}
        couponPostStatus={LoadingStatus.Error}
      />
    );
    expect(screen.getByText(/Ошибка при отправке./i)).toBeInTheDocument();
  });
});
