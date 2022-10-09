import {render, screen} from '@testing-library/react';
import {NavItem} from '../common';
import {ComponentName} from '../../../utils/const';

const fakeName = 'Доставка';

describe('navigation item component', () => {
  it('should render correctly in header', () => {
    render (
      <NavItem
        name={fakeName}
        usingComponent={ComponentName.Header}
      />
    );

    const headerContainer = screen.getByRole('listitem').className;
    const headerLink = screen.getByRole('link');

    expect(headerContainer === 'main-nav__item').toBe(true);
    expect(headerLink).toBeInTheDocument();
  });

  it('should render correctly in footer', () => {
    render (
      <NavItem
        name={fakeName}
        usingComponent={ComponentName.Footer}
      />
    );

    const footerContainer = screen.getByRole('listitem').className;
    const footerLink = screen.getByRole('link');

    expect(footerContainer === 'footer__item').toBe(true);
    expect(footerLink).toBeInTheDocument();
  });
});
