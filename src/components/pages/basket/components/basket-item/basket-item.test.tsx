import {render, screen} from '@testing-library/react';
import {BasketItem} from '../components';
import {getFakeCamera} from '../../../../../utils/mocks';

const fakeCamera = getFakeCamera();

describe('basket item component', () => {
  it('should render correctly', () => {
    render (
      <BasketItem onModalOpen={jest.fn()} camera={fakeCamera}/>
    );

    expect(screen.getByText(/Общая цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });
});
