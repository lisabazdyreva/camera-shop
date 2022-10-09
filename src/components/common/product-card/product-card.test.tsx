import {getFakeCamera} from '../../../utils/mocks';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {ProductCard} from '../common';
import userEvent from '@testing-library/user-event';

const mockCamera = getFakeCamera();

describe('product card component', () => {
  it('should render product card with data for catalog correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard
          handleAddModal={jest.fn()}
          data={mockCamera}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });

  it('should correctly render product card for catalog and check is add modal handler working', async () => {
    const onClick = jest.fn();

    render (
      <MemoryRouter>
        <ProductCard
          handleAddModal={onClick}
          data={mockCamera}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole('button');

    if (button) {
      await userEvent.click(button);
    }

    await expect(onClick).toBeCalled();

  });
});
