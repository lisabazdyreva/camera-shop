import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import Basket from './basket';

import {NameSpace} from '../../../utils/const';
import {getFakeCameras, getMockState, mockStore} from '../../../utils/mocks';

const mockState = getMockState();

const store = mockStore(mockState);

const storeBasketFull = mockStore({...mockState,
  [NameSpace.Order]: {
    basket: getFakeCameras()
  },
});


describe('basket page component', () => {
  it('should render correctly with empty basket', () => {
    window.scrollTo = jest.fn();
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Basket />
        </MemoryRouter>
      </Provider>
    );
    const element = screen.getByRole('heading', {level: 1});
    expect(element.innerHTML).toBe('Корзина');
    expect(screen.getByText('Добавьте товары в корзину.')).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });

  it('should render basket items when they exist', () => {
    window.scrollTo = jest.fn();
    render (
      <Provider store={storeBasketFull}>
        <MemoryRouter>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('basket-item')[0]).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });
});
