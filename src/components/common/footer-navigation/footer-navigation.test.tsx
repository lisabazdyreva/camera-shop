import {render, screen} from '@testing-library/react';
import {FooterNavigation} from '../common';
import {MemoryRouter} from 'react-router-dom';

describe('footer navigation component', () => {
  it('should render correctly', () => {
    render (
      <MemoryRouter>
        <FooterNavigation />
      </MemoryRouter>
    );

    const footerNavigationListClass = screen.queryAllByRole('list')[0].className;

    expect(screen.getByText(/Навигация/i)).toBeInTheDocument();
    expect(screen.getByText(/Поддержка/i)).toBeInTheDocument();

    expect(footerNavigationListClass === 'footer__list').toBe(true);
  });
});
