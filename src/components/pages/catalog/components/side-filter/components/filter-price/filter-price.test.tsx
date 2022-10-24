import {render, screen} from '@testing-library/react';
import FilterPrice from './filter-price';
import {Provider} from 'react-redux';
import {getMockState, mockStore} from '../../../../../../../utils/mocks';
import {MemoryRouter} from 'react-router-dom';

const state = getMockState();
const store = mockStore(state);

describe('filter price component', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilterPrice lowPriceValue={0} onLowPriceChange={jest.fn} highPriceValue={0} onHighPriceChange={jest.fn} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByTestId('price-filter')).toBeInTheDocument();
  });
});
