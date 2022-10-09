import {render, screen} from '@testing-library/react';
import {BasketSummary} from '../components';
import {MemoryRouter} from 'react-router-dom';

describe('basket summary component', () => {
  it('should render basket summary', () => {
    render (
      <MemoryRouter>
        <BasketSummary />
      </MemoryRouter>
    );

    const header = screen.getByTestId('basket-summary-header');
    expect(header).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
  });
});
