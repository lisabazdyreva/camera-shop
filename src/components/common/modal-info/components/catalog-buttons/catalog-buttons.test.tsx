import {render, screen} from '@testing-library/react';
import {CatalogButtons} from '../components';
import {MemoryRouter} from 'react-router-dom';

describe('test catalog buttons', () => {
  it('renders correctly', () => {
    render (
      <MemoryRouter>
        <CatalogButtons handleCloseSuccessModal={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
