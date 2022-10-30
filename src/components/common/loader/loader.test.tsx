import {render, screen} from '@testing-library/react';
import {Loader} from '../common';

describe('loader component', () => {
  it('should render correctly', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText(/Идёт загрузка.../i)).toBeInTheDocument();
  });
});
