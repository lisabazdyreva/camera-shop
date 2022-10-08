import {render, screen} from '@testing-library/react';
import {FooterNavigation} from '../common';
import {MemoryRouter} from 'react-router-dom';

describe('test footer navigation', () => {
  it('renders correctly', () => {
    render (
      <MemoryRouter>
        <FooterNavigation />
      </MemoryRouter>
    );

    const footerNavigationItems = document.querySelectorAll('.footer__nav-item');

    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();

    expect(footerNavigationItems.length).toBe(3);
  });
});
