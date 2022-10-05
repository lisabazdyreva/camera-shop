import {render, screen} from '@testing-library/react';
import {BasketSummary} from '../components';
import {MemoryRouter} from 'react-router-dom';

describe('basket summary', () => {
  it('render basket summary', () => {
    render (
      <MemoryRouter>
        <BasketSummary />
      </MemoryRouter>
    );

    const title = document.querySelector('.title--h4');
    let titleText;

    if (title) {
      titleText = title.innerHTML;
    }

    expect(titleText).toBe('Если у вас есть промокод на скидку, примените его в этом поле');
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
  });
});
