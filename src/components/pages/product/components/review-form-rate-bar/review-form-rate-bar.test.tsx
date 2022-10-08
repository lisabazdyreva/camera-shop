import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {ReviewFormRateBar} from '../components';

const mockStore = configureMockStore();
const store = mockStore({});

describe('review form rating bar test', () => {
  it ('renders correctly when valid', () => {
    render (
      <Provider store={store} >
         <MemoryRouter>
          <ReviewFormRateBar
            selectedRating={2}
            isValid={true}
            handleInputInvalid={jest.fn()}
          />
         </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });

  it ('renders correctly when invalid', () => {
    render (
      <Provider store={store} >
        <MemoryRouter>
          <ReviewFormRateBar
            selectedRating={0}
            isValid={false}
            handleInputInvalid={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const fieldset = document.querySelector('.is-invalid');

    expect(fieldset).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });
});
