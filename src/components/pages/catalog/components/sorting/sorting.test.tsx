import {render, screen} from '@testing-library/react';
import {Sorting} from '../components';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {getMockState, mockStore} from '../../../../../utils/mocks';

const mockState = getMockState();
const store = mockStore(mockState);

describe('sorting component', () => {
  it ('should render correctly', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Sorting/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sorting-form')).toBeInTheDocument();
    expect(screen.getByLabelText('по популярности', {selector: 'input'})).toBeInTheDocument();
  });
});
