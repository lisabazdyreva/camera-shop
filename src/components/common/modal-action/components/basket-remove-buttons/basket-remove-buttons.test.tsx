import {render, screen} from '@testing-library/react';
import {BasketRemoveButtons} from '../components';

describe('basket remove buttons component', () => {
  it('should render correctly', () => {
    render (
      <BasketRemoveButtons />
    );

    expect(screen.getByText(/Удалить/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
});
