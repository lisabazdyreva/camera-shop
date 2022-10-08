import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

import {HistoryRoute, ModalAction} from '../common';
import {ComponentName, DefaultValue, initialReview, NameSpace} from '../../../utils/const';
import Catalog from '../../pages/catalog/catalog';
import {getFakeSuccessStatus, makeFakeCamera, makeFakePromo} from '../../../utils/mocks';
import {createAPI} from '../../../services/api';
import thunk from 'redux-thunk';

const api = createAPI();

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.App]: {
    reviewFormData: initialReview,
  }
});
const fakeCamera = makeFakeCamera();

describe('test modal action', () => {
  it('renders correctly catalog modal', () => {
    window.scrollTo = jest.fn();

    render (
      <Provider store={store}>
          <ModalAction
            usingComponent={ComponentName.Catalog}
            handleCloseModal={jest.fn()}
            data={fakeCamera}
          />
      </Provider>
    );
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });

  it('renders correctly product modal', () => {
    window.scrollTo = jest.fn();

    render (
      <Provider store={store}>
        <ModalAction
          usingComponent={ComponentName.Product}
          handleCloseModal={jest.fn()}
          data={fakeCamera}
        />
      </Provider>
    );
    const form = document.querySelector('form');

    expect(form).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('renders correctly basket modal', () => {
    window.scrollTo = jest.fn();
    render (
      <Provider store={store}>
        <ModalAction
          usingComponent={ComponentName.Basket}
          handleCloseModal={jest.fn()}
        />
      </Provider>
    );

    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });

});
