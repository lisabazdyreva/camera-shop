import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import Header from './header';

describe('header component', () => {
  it ('should render correctly', () => {
    render (
      <MemoryRouter>
        <Header/>
      </MemoryRouter>
    );
    const listClasses = screen.getByTestId('header-list').className;

    expect(listClasses === 'main-nav__list').toBe(true);
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
