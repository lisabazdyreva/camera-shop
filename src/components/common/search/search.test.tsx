import {render, screen} from '@testing-library/react';
import {Search} from '../common';

describe('search component', () => {
  it('should render correctly', () => {
    render(
      <Search />
    );

    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });
});
