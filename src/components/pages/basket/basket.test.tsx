import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import Basket from './basket';

import {DefaultValue, NameSpace} from '../../../utils/const';
import {mockStore} from '../../../utils/mocks';


const store = mockStore({
  [NameSpace.App]: {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
});

describe('basket page component', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Basket />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Общая цена/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });
});
