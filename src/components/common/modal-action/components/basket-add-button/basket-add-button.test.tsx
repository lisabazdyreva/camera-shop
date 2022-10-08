import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {BasketAddButton} from '../components';


const mockStore = configureMockStore();
const store = mockStore({});

describe('test basket add buttons', () => {
  it('renders correctly', () => {
    render (
      <Provider store={store} >
        <BasketAddButton handleCloseModal={jest.fn()} />
      </Provider>
    );

    const button = document.querySelector('.modal__btn');

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
