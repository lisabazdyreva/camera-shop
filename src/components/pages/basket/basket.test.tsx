import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

import Basket from './basket';

import {DefaultValue, NameSpace} from '../../../utils/const';

import {createAPI} from '../../../services/api';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({

  [NameSpace.App]: {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
});

describe('Basket page', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Общая цена/i)).toBeInTheDocument();
  });

  it ('should render with modal', async () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Basket />
        </MemoryRouter>
      </Provider>
    );

    const buttonRemove = document.querySelector('.cross-btn');

    if (buttonRemove) {
      await userEvent.click(buttonRemove);
    }

    await expect(screen.getByTestId('modal-action')).toBeInTheDocument();
  });
});
