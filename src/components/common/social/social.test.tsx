import {render, screen} from '@testing-library/react';
import {Social} from '../common';

describe('social component', () => {
  it('should render correctly', () => {
    render(
      <Social />
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
