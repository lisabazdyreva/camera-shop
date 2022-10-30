import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {ModalInfo} from '../common';
import {LoadingStatus, ModalInfoName, NameSpace} from '../../../utils/const';
import {getFakeErrorStatus, getFakeSuccessStatus, mockStore} from '../../../utils/mocks';


const storeSuccess = mockStore({
  [NameSpace.Reviews]: {
    reviewPostStatus: getFakeSuccessStatus(),
  },
  [NameSpace.Order]: {
    orderPostStatus: LoadingStatus.Success,
  },
});

const storeError = mockStore({
  [NameSpace.Reviews]: {
    reviewPostStatus: getFakeErrorStatus(),
  },
  [NameSpace.Order]: {
    orderPostStatus: LoadingStatus.Error,
  },
});

describe('modal info component', () => {
  it('should render correctly modal successfully added to basket', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeSuccess}>
        <MemoryRouter>
          <ModalInfo modalInfoType={ModalInfoName.AddedToBasket} onInfoModalClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });

  it('should render correctly review posted modal when form successful sent', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeSuccess}>
        <MemoryRouter>
          <ModalInfo modalInfoType={ModalInfoName.ReviewPost} onInfoModalClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Вернуться к покупкам/i)).toBeInTheDocument();
    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });

  it('should render correctly review posted modal when form failed', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeError}>
        <MemoryRouter>
          <ModalInfo modalInfoType={ModalInfoName.ReviewPost} onInfoModalClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Произошла ошибка/i)).toBeInTheDocument();
  });

  it('should render correctly order post modal when it is successfully sent', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeSuccess}>
        <MemoryRouter>
          <ModalInfo modalInfoType={ModalInfoName.OrderPost} onInfoModalClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за покупку/i)).toBeInTheDocument();
  });

  it('should render correctly order post modal when form failed', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeError}>
        <MemoryRouter>
          <ModalInfo modalInfoType={ModalInfoName.OrderPost} onInfoModalClose={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Произошла ошибка/i)).toBeInTheDocument();
  });
});
