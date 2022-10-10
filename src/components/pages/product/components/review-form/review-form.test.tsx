import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';

import {ReviewForm} from '../components';
import {initialReview, NameSpace} from '../../../../../utils/const';
import {getFakeID} from '../../../../../utils/mocks';

const fakeID = getFakeID();

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.App]: {
    reviewFormData: initialReview,
  }
});

describe('test review form component', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <ReviewForm onModalClose={jest.fn()} onSuccessModalOpen={jest.fn()} id={fakeID} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('plus')).toBeInTheDocument();
  });
});
