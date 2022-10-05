import {render, screen} from '@testing-library/react';
import {BasketItem} from '../components';

describe('basket item', () => {
  it('render correctly', () => {
    render (
      <BasketItem handleOpenModal={jest.fn()} />
    );

    expect(screen.getByText(/Общая цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });
});
