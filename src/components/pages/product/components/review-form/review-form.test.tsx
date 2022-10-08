import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {ReviewForm} from '../components';
import {initialReview, NameSpace} from '../../../../../utils/const';

const FAKE_ID = 2;

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.App]: {
    reviewFormData: initialReview,
  }
});

describe('test review form', () => {
  it('renders correctly', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <ReviewForm handleCloseModal={jest.fn()} id={FAKE_ID} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('renders correctly when inputs invalid', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <ReviewForm handleCloseModal={jest.fn()} id={FAKE_ID} />
        </MemoryRouter>
      </Provider>
    );
    //TODO
  });

});
