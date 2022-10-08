import {render, screen} from '@testing-library/react';
import {ReviewListCard} from '../components';
import {getFakeErrorStatus, getFakeLoadingStatus, getFakeSuccessStatus} from '../../../../../utils/mocks';

const fakeSuccessStatus = getFakeSuccessStatus();
const fakeErrorStatus = getFakeErrorStatus();
const fakeLoadingStatus = getFakeLoadingStatus();

describe('reviews list test', () => {
  it('renders correctly with success status', () => {
    render(
      <ReviewListCard fetchStatus={fakeSuccessStatus} />
    );

    const list = document.querySelector('.review-block__list');
    const listChildrenLength = list && list.childNodes.length;

    expect(listChildrenLength).toBe(3);

    const title = list && list.querySelector('.item-list__title');
    const titleText = title && title.textContent;

    expect(titleText).toBe('Достоинства'); //TODO check with button click
  });

  it('renders correctly with error-info status', () => {
    render(
      <ReviewListCard fetchStatus={fakeErrorStatus} />
    );

    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
  });

  it('renders correctly with loading status', () => {
    render(
      <ReviewListCard fetchStatus={fakeLoadingStatus} />
    );

    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  })
});
