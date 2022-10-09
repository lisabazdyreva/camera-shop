import {render, screen} from '@testing-library/react';
import {BasketItemShort} from '../components';
import {getFakeCamera} from '../../../../../utils/mocks';

const camera = getFakeCamera();

describe('basket item short component', () => {
  it('should render correctly', () => {
    render (
      <BasketItemShort data={camera} />
    );
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/уровень/i)).toBeInTheDocument();
  });
});
