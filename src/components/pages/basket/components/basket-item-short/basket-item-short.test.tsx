import {render, screen} from '@testing-library/react';
import {BasketItemShort} from '../components';
import {makeFakeCamera} from '../../../../../utils/mocks';

const camera = makeFakeCamera();

describe('basket item short', () => {
  it('renders correctly', () => {
    render (
      <BasketItemShort data={camera} />
    );
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/уровень/i)).toBeInTheDocument();
  });
});
