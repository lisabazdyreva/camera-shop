import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Pagination} from '../components';

describe('pagination component', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPageNumber={2}
          setCurrentPageNumber={jest.fn()}
          pagesAmount={3}
        />
      </MemoryRouter>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });

  it('should render correctly when it is first page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPageNumber={1}
          setCurrentPageNumber={jest.fn()}
          pagesAmount={3}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
  });

  it('should render correctly when it is last page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPageNumber={3}
          setCurrentPageNumber={jest.fn()}
          pagesAmount={3}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });
});
