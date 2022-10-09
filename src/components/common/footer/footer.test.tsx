import {render, screen} from '@testing-library/react';
import {Footer} from '../common';
import {MemoryRouter} from 'react-router-dom';

describe('footer component', () => {
  it('should render correctly', () => {
    render (
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const listClasses = screen.getByTestId('footer-navigation').className;

    expect(screen.getByText(/Интернет-магазин фото- и видеотехники/i)).toBeInTheDocument();
    expect(listClasses === 'footer__nav').toBe(true);
  });
});
