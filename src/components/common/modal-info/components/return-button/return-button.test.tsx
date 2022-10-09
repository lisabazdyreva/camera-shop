import {render, screen} from '@testing-library/react';
import {ReturnButton} from '../components';

describe('return button component', () => {
  it('should render correctly', () => {
    render (
      <ReturnButton />
    );

    const button = screen.getByRole('button');

    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
