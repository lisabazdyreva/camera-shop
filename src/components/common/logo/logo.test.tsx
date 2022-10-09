import {render, screen} from '@testing-library/react';
import {Logo} from '../common';
import {ComponentName} from '../../../utils/const';

describe('logo component', () => {
  it('should render correctly in header component', () => {
    render (
      <Logo usingComponent={ComponentName.Header} />
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    const linkClass = link.className;
    expect(linkClass === 'header__logo').toBe(true);
  });

  it('should render correctly in footer component', () => {
    render (
      <Logo usingComponent={ComponentName.Footer} />
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();

    const linkClass = link.className;
    expect(linkClass === 'footer__logo').toBe(true);
  });
});
