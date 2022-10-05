import {render, screen} from '@testing-library/react';
import {ReviewCard} from '../components';
import {makeFakeReview} from '../../../../../mocks';

const fakeReview = makeFakeReview();

describe('review card', () => {
  it('renders correctly', () => {
    render (
      <ReviewCard data={fakeReview} />
    );

    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });
});
