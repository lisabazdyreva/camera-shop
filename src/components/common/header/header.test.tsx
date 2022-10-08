import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import Header from './header';

describe('test header',  () => {
  it ('renders correctly', () => {
    render (
      <MemoryRouter>
        <Header/>
      </MemoryRouter>
    );

    const navigationHeaderList = document.querySelector('.main-nav__list');

    expect(navigationHeaderList).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });
});
