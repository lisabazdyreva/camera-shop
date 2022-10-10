import {render, screen} from '@testing-library/react';
import {BasketItem} from '../components';

describe('basket item component', () => {
  it('should render correctly', () => {
    render (
      <BasketItem onModalOpen={jest.fn()} />
    );

    expect(screen.getByText(/Общая цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });
});
