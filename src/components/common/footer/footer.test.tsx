import {render, screen} from '@testing-library/react';
import {Footer} from '../common';
import {MemoryRouter} from 'react-router-dom';

describe('test footer',  () => {
  it('renders correctly', () => {
    render (
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const navigationList = document.querySelector('.footer__nav');

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(navigationList).toBeInTheDocument();
  });
});
