import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {BasketAddButton} from '../components';
import {mockStore} from '../../../../../utils/mocks';


const store = mockStore({});

describe('basket add buttons component', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store} >
        <BasketAddButton handleCloseModal={jest.fn()} />
      </Provider>
    );

    const button = screen.getByRole('button');

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
