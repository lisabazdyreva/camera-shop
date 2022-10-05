import {render} from '@testing-library/react';
import {Logo} from '../common';
import {ComponentName} from '../../../utils/const';

describe('logo test', () => {
  it('renders correctly in header', () => {
    render (
      <Logo usingComponent={ComponentName.Header} />
    );

    const linkLabel = document.querySelector('[aria-label="Переход на главную"]')
    expect(linkLabel).toBeInTheDocument();

    const link = document.querySelector('.header__logo');
    expect(link).toBeInTheDocument();
  });

  it('renders correctly in footer', () => {
    render (
      <Logo usingComponent={ComponentName.Footer} />
    );

    const link = document.querySelector('.footer__logo');
    expect(link).toBeInTheDocument();
  });
});
