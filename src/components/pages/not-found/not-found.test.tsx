import {render, screen} from '@testing-library/react';
import NotFound from './not-found';
import {MemoryRouter} from 'react-router-dom';

describe('not found page component', () => {
  it('should render correctly', () => {
    render (
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/Такой страницы не найдено/i)).toBeInTheDocument();
  });
});
