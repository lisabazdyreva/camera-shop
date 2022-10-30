import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {ReviewListCard} from '../components';
import {getFakeErrorStatus, getFakeLoadingStatus, getFakeReviews, getFakeSuccessStatus, mockStore} from '../../../../../utils/mocks';
import {NameSpace} from '../../../../../utils/const';

const fakeSuccessStatus = getFakeSuccessStatus();
const fakeErrorStatus = getFakeErrorStatus();
const fakeLoadingStatus = getFakeLoadingStatus();
const fakeReviews = getFakeReviews();


const store = mockStore({
  [NameSpace.Reviews]: {
    reviews: fakeReviews,
  },
});

describe('reviews list component', () => {
  it('should render correctly with success status', () => {
    render (
      <Provider store={store} >
        <ReviewListCard fetchStatus={fakeSuccessStatus} />
      </Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Показать больше отзывов/i)).toBeInTheDocument();
  });

  it('should render correctly with error status', () => {
    render (
      <Provider store={store} >
        <ReviewListCard fetchStatus={fakeErrorStatus} />
      </Provider>
    );

    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
  });

  it('should render correctly with loading status', () => {
    render (
      <Provider store={store} >
        <ReviewListCard fetchStatus={fakeLoadingStatus} />
      </Provider>
    );

    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });
});
