import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {ProductItem} from '../components';
import {getFakeCamera} from '../../../../../utils/mocks';


const fakeCamera = getFakeCamera();


describe('product item component', () => {
  it('should render correctly', () => {
    render (
      <MemoryRouter>
        <ProductItem data={fakeCamera} onCameraAddToBasket={jest.fn}/>
      </MemoryRouter>
    );

    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
