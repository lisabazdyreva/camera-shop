import {render, screen} from '@testing-library/react';
import {Sorting} from '../components';


describe('sorting component', () => {
  it ('should render correctly', () => {
    render (
      <Sorting/>
    );

    expect(screen.getByTestId('sorting-form')).toBeInTheDocument();
    expect(screen.getByLabelText('по популярности', {selector: 'input'})).toBeInTheDocument();
  });
});
