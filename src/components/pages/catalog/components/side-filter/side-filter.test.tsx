import {render, screen} from '@testing-library/react';
import {SideFilter} from '../components';

describe('side filter', () => {
  it('side filter renders correctly', () => {
    render (
      <SideFilter />
    );
    const header = document.querySelector('h2');
    let text;

    if (header) {
      text = header.innerHTML;
    }

    expect(text).toBe('Фильтр');
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});
