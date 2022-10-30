import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import Product from './product';
import {getMockState, mockStore} from '../../../utils/mocks';


const mockState = getMockState();
const store = mockStore(mockState);


describe('product page component', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();
    render(
      <Provider store={store} >
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });
});
