import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {ProductItem} from '../components';

import {getFakeCamera} from '../../../../../utils/mocks';


const mockStore = configureMockStore();
const fakeCamera = getFakeCamera();
const store = mockStore();

describe('product item component', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store} >
        <MemoryRouter>
          <ProductItem data={fakeCamera} handleAddCameraModalShow={jest.fn}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
