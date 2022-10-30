import {render, screen} from '@testing-library/react';
import {BasketOrder} from '../components';

describe('basket order component', () => {
  it('should render correctly', () => {
    render(
      <BasketOrder onOrderFormSubmit={jest.fn} price={0} discount={0} isCameras={0} />
    );

    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
  });

  it('should render correctly when price noticed', () => {
    render(
      <BasketOrder onOrderFormSubmit={jest.fn} price={100} discount={0} isCameras={0} />
    );

    expect(screen.getByTestId('total-price').innerHTML).toBe('100&nbsp;₽');
  });
});
