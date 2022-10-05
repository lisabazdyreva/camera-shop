import {render, screen} from '@testing-library/react';
import {Search} from '../common';

describe('search component test', () => {
  it('renders correct', () => {
    render(
      <Search />
    );

    const formSearchList = document.querySelector('.form-search__select-list');

    expect(formSearchList).toBeInTheDocument();
    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
  });
});
