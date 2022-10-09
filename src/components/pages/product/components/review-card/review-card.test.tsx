import {render, screen} from '@testing-library/react';
import {ReviewCard} from '../components';
import {getFakeReview} from '../../../../../utils/mocks';

const fakeReview = getFakeReview();

describe('review card component', () => {
  it('should render correctly', () => {
    render (
      <ReviewCard data={fakeReview} />
    );

    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });
});
