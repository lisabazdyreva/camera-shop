import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Pagination} from '../components';

describe('pagination', () => {
  it('pagination renders correctly', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPageNumber={2}
          setCurrentPageNumber={jest.fn()}
          pages={[1, 2, 3]} />
      </MemoryRouter>
    );

    const listItem = document.querySelector('.pagination__item');
    expect(listItem).toBeInTheDocument();

  });

  it('pagination renders correctly when it first page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPageNumber={1}
          setCurrentPageNumber={jest.fn()}
          pages={[1, 2, 3]} />
      </MemoryRouter>
    );

    const links = document.querySelectorAll('.pagination__link--text');
    expect(links.length).toBe(1);

    const linkItemNext = links[0];
    expect(linkItemNext).toBeInTheDocument();

    let linkItemNextText;

    if (linkItemNext) {
      linkItemNextText = linkItemNext.innerHTML;
    }
    expect(linkItemNextText).toBe('Далее');
  });

  it('pagination renders correctly when it is last page', () => {
    render(
      <MemoryRouter>
        <Pagination
          currentPageNumber={3}
          setCurrentPageNumber={jest.fn()}
          pages={[1, 2, 3]} />
      </MemoryRouter>
    );

    const links = document.querySelectorAll('.pagination__link--text');

    expect(links.length).toBe(1);

    const linkItemPrevious = links[0];
    expect(linkItemPrevious).toBeInTheDocument();

    let linkItemPreviousText;

    if (linkItemPrevious) {
      linkItemPreviousText = linkItemPrevious.innerHTML;
    }
    expect(linkItemPreviousText).toBe('Назад');
  });
});
