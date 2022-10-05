import {render, screen} from '@testing-library/react';
import {ReviewListCard} from '../components';
import {LoadingStatus} from '../../../../../utils/const';
import {makeFakeReview} from '../../../../../mocks';

const fakeSuccessStatus = LoadingStatus.Success;
const fakeErrorStatus = LoadingStatus.Error;
const fakeLoadingStatus = LoadingStatus.Loading;
const fakeReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview()];

describe('reviews list', () => {
  it('renders correctly with success status', () => {
    render(
      <ReviewListCard fetchStatus={fakeSuccessStatus} reviews={fakeReviews} />
    );

    const list = document.querySelector('.review-block__list');
    const listChildsLength = list && list.childNodes.length;

    expect(listChildsLength).toBe(3);

    const title = list && list.querySelector('.item-list__title');
    const titleText = title && title.textContent;

    expect(titleText).toBe('Достоинства')
  });

  it('renders correctly with error status', () => {
    render(
      <ReviewListCard fetchStatus={fakeErrorStatus} reviews={[]} />
    );

    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
  });

  it('renders correctly with loading status', () => {
    render(
      <ReviewListCard fetchStatus={fakeLoadingStatus} reviews={[]} />
    );

    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  })
});
