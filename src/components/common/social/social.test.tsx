import {render} from '@testing-library/react';
import {Social} from '../common';

describe('social test', () => {
  it('render correctly', () => {
    render(
      <Social />
    );
    const list = document.querySelector('.social');
    expect(list).toBeInTheDocument();

    const link = list && list.querySelector('[aria-label = "Переход на страницу vk"]')
    expect(link).toBeInTheDocument();
  });
});
