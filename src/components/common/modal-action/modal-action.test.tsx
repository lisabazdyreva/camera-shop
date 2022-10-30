import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';

import {ModalAction} from '../common';
import {initialReview, ModalActionName, NameSpace} from '../../../utils/const';
import {getFakeCamera, mockStore} from '../../../utils/mocks';

const store = mockStore({
  [NameSpace.App]: {
    reviewFormData: initialReview,
  }
});
const fakeCamera = getFakeCamera();


describe('modal action component', () => {
  it('should render correctly modal add to basket', () => {
    window.scrollTo = jest.fn();
    render (
      <Provider store={store}>
        <ModalAction
          modalActionType={ModalActionName.AddToBasket}
          onActionModalClose={jest.fn}
          onInfoModalOpen={jest.fn}
          data={fakeCamera}
        />
      </Provider>
    );
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
  });

  it('should render correctly modal add review', () => {
    window.scrollTo = jest.fn();

    render (
      <Provider store={store}>
        <ModalAction
          modalActionType={ModalActionName.AddReview}
          onActionModalClose={jest.fn}
          onInfoModalOpen={jest.fn}
          data={fakeCamera}
        />
      </Provider>
    );

    expect(screen.getByTestId('modal-action')).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });

  it('should render correctly modal remove from basket', () => {
    window.scrollTo = jest.fn();
    render (
      <Provider store={store}>
        <ModalAction
          modalActionType={ModalActionName.RemoveFromBasket}
          onActionModalClose={jest.fn}
          onInfoModalOpen={jest.fn}
        />
      </Provider>
    );
    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });

});
