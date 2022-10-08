import {render, screen} from '@testing-library/react';
import {ReturnButton} from '../components';

describe('test return button', () => {
  it('renders correctly', () => {
    render (
      <ReturnButton />
    );

    const button = document.querySelector('.modal__btn');

    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
