import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {ReviewFormRateBar} from '../components';
import {mockStore} from '../../../../../utils/mocks';


const store = mockStore({});

describe('review form rating bar component', () => {
  it ('should render correctly when valid', () => {
    render (
      <Provider store={store} >
        <MemoryRouter>
          <ReviewFormRateBar
            selectedRating={2}
            isValid
            handleInputInvalid={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });

  it ('should render correctly when invalid', () => {
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

    const input = screen.getAllByRole('radio')[0] as HTMLInputElement;
    expect(input).toBeInvalid();
  });
});
