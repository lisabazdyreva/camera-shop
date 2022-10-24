import {render, screen} from '@testing-library/react';
import {SideFilter} from '../components';
import {Provider} from 'react-redux';
import {getMockState, mockStore} from '../../../../../utils/mocks';
import {MemoryRouter} from 'react-router-dom';

const mockState = getMockState();
const store = mockStore(mockState);

describe('side filter component', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <SideFilter />
        </MemoryRouter>
      </Provider>
    );
    const header = screen.getByRole('heading').innerHTML;

    expect(header).toBe('Фильтр');
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});
