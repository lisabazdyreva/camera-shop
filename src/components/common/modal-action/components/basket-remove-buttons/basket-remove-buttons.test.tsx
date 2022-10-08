import {render, screen} from '@testing-library/react';
import {BasketRemoveButtons} from '../components';

describe('test basket remove buttons',  () => {
  it('renders correctly', () => {
    render (
      <BasketRemoveButtons />
    );

    expect(screen.getByText(/Удалить/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
