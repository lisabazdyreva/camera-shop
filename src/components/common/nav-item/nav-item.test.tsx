import {render} from '@testing-library/react';
import {NavItem} from '../common';
import {ComponentName} from '../../../utils/const';

const fakeName = 'Доставка';

describe('navigation item test', () => {
  it('renders correctly in header', () => {
    render (
      <NavItem
        name={fakeName}
        usingComponent={ComponentName.Header}
      />
    );

    const headerContainer = document.querySelector('.main-nav__item');
    const headerLink = document.querySelector('.main-nav__link');

    expect(headerContainer).toBeInTheDocument();
    expect(headerLink).toBeInTheDocument();
  });

  it('renders correctly in footer', () => {
    render (
      <NavItem
        name={fakeName}
        usingComponent={ComponentName.Footer}
      />
    );

    const footerContainer = document.querySelector('.footer__item');
    const footerLink = document.querySelector('.link');

    expect(footerContainer).toBeInTheDocument();
    expect(footerLink).toBeInTheDocument();
  });
});
