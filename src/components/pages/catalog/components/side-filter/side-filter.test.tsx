import {render, screen} from '@testing-library/react';
import {SideFilter} from '../components';

describe('side filter component', () => {
  it('should render correctly', () => {
    render (
      <SideFilter />
    );
    const header = screen.getByRole('heading').innerHTML;

    expect(header).toBe('Фильтр');
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});
