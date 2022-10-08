import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {ProductItem} from '../components';

import {makeFakeCamera} from '../../../../../utils/mocks';


const mockStore = configureMockStore();
const fakeCamera = makeFakeCamera();
const store = mockStore();

describe('product item test', () => {
  it('renders correctly', () => {
    render (
      <Provider store={store} >
        <MemoryRouter>
          <ProductItem data={fakeCamera} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
