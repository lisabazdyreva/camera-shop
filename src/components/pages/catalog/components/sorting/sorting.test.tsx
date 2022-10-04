import {render, screen} from '@testing-library/react';
import {Sorting} from '../components';


describe('sorting component', () => {
  it ('sorting renders correctly', () => {
    render (
      <Sorting/>
    );

    const title = document.querySelector('.title--h5');
    let titleText;

    if (title) {
      titleText = title.innerHTML;
    }

    expect(titleText).toBe('Сортировать:');
    expect(screen.getByLabelText('по популярности', {selector: 'input'})).toBeInTheDocument();
  });
});
