import {render, screen} from '@testing-library/react';
import {ModalInfo} from '../common';
import {ComponentName, NameSpace} from '../../../utils/const';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import {getFakeErrorStatus, getFakeSuccessStatus} from '../../../utils/mocks';


const mockStore = configureMockStore();
const storeSuccess = mockStore({
  [NameSpace.Reviews]: {
    reviewPostStatus: getFakeSuccessStatus(),
  }
});

const storeError = mockStore({
  [NameSpace.Reviews]: {
    reviewPostStatus: getFakeErrorStatus(),
  }
});

describe('test modal info', () => {
  it('renders correctly catalog modal', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeSuccess}>
        <MemoryRouter>
          <ModalInfo usingComponent={ComponentName.Catalog} handleCloseModal={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('renders correctly product modal when form successful sent', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeSuccess}>
        <MemoryRouter>
          <ModalInfo usingComponent={ComponentName.Product} handleCloseModal={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });

  it('renders correctly product modal when form failed', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeError}>
        <MemoryRouter>
          <ModalInfo usingComponent={ComponentName.Product} handleCloseModal={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Произошла ошибка/i)).toBeInTheDocument();
  });

  it('renders correctly basket modal', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeSuccess}>
        <MemoryRouter>
          <ModalInfo usingComponent={ComponentName.Basket} handleCloseModal={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  });
});
