import {render, screen} from '@testing-library/react';
import {Loader} from '../common';

describe('test loader', () => {
  it('renders correctly', () => {
    render (
      <Loader />
    );
    const loader = document.querySelector('.loader');

    expect(loader).toBeInTheDocument();
    expect(screen.getByText(/Идёт загрузка.../i)).toBeInTheDocument();
  });
});
