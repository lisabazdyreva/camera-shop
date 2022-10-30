import {render, screen} from '@testing-library/react';
import {Rating} from '../common';
import {RatingClass} from '../../../utils/const';
import {getFakeID} from '../../../utils/mocks';

const fakeId = getFakeID();

describe('rating component', () => {
  it('should render correctly on review page', () => {
    render (
      <Rating
        rating={3}
        id={fakeId}
        isDetailed={false}
        additionalClass={RatingClass.Review}
      />
    );

    const rateCount = screen.queryByText(/Всего оценок:/i);

    expect(rateCount).not.toBeInTheDocument();
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
  });

  it('should render correctly on product and catalog pages', () => {
    render (
      <Rating
        rating={3}
        id={fakeId}
        isDetailed
        additionalClass={RatingClass.Product}
        reviewCount={10}
      />
    );
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
  });
});
