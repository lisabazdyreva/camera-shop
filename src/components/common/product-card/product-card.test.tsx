import {makeFakeCamera} from '../../../utils/mocks';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {ProductCard} from '../common';
import userEvent from '@testing-library/user-event';

const mockCamera = makeFakeCamera();

describe('Render Product Card correctly', () => {
  it('should render Product Card with data for Catalog', () => {
    render(
      <MemoryRouter>
        <ProductCard
          handleAddModal={jest.fn()}
          data={mockCamera}
          // additionalClass={}
          // withoutBasketImplementation={}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });

  it('should render Product Card for Catalog and check is add Modal handler working', async () => {
    const onClick = jest.fn();

    render (
      <MemoryRouter>
        <ProductCard
          handleAddModal={onClick}
          data={mockCamera}
        />
      </MemoryRouter>
    );

    const button = document.querySelector('.product-card__btn');

    if (button) {
      await userEvent.click(button);
    }

    await expect(onClick).toBeCalled();

  });
});
