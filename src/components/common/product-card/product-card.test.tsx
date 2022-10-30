import {getFakeCamera, mockStore} from '../../../utils/mocks';
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import {ProductCard} from '../common';
import {Provider} from 'react-redux';
import {NameSpace} from '../../../utils/const';


const mockCamera = getFakeCamera();
const store = mockStore({
  [NameSpace.Order]: {
    basket: [],
  },
});

describe('product card component', () => {
  it('should render product card with data for catalog correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            handleAddModal={jest.fn()}
            data={mockCamera}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
  });

  it('should correctly render product card for catalog and check is add modal handler working', async () => {
    const onClick = jest.fn();

    render (
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            handleAddModal={onClick}
            data={mockCamera}
          />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button');

    if (button) {
      await userEvent.click(button);
    }

    await expect(onClick).toBeCalled();

  });
});
