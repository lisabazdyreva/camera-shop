import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {ModalAction} from '../common';
import {ComponentName, initialReview, NameSpace} from '../../../utils/const';
import {getFakeCamera, mockStore} from '../../../utils/mocks';

const store = mockStore({
  [NameSpace.App]: {
    reviewFormData: initialReview,
  }
});
const fakeCamera = getFakeCamera();


describe('modal action component', () => {
  it('should render correctly modal on catalog page', () => {
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

  it('should render modal correctly on product page', () => {
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

    expect(screen.getByTestId('modal-action')).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should render modal correctly on basket page', () => {
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
