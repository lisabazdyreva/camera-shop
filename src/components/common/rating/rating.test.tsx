import {render, screen} from '@testing-library/react';
import {Rating} from '../common';
import {RatingClass} from '../../../utils/const';
import faker from 'faker';

describe('rating test', () => {
  it('renders correctly review page', () => {
    render (
      <Rating
        rating={3}
        id={faker.datatype.string()}
        isDetailed={false}
        additionalClass={RatingClass.Review} />
    );

    const rateCount = document.querySelector('.rate__count');

    expect(rateCount).not.toBeInTheDocument();
    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
  });

  it('renders correctly product and catalog page', () => {
    render (
      <Rating
        rating={3}
        id={faker.datatype.number()}
        isDetailed
        additionalClass={RatingClass.Product}
        reviewCount={faker.datatype.number()}
      />
    );
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
  });

});
