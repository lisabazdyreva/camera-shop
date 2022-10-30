import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {BasketSummary} from '../components';
import {mockStore} from '../../../../../utils/mocks';
import {NameSpace} from '../../../../../utils/const';

const store = mockStore({
  [NameSpace.Order]: {
    basket: [],
  },
});

describe('basket summary component', () => {
  it('should render basket summary', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <BasketSummary onPostOrderModalOpen={jest.fn} />
        </MemoryRouter>
      </Provider>
    );

    const header = screen.getByTestId('basket-summary-header');
    expect(header).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
  });
});
