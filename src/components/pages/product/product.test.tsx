import {createAPI} from '../../../services/api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {DefaultValue, LoadingStatus, NameSpace} from '../../../utils/const';
import {makeFakeCamera, makeFakeReview} from '../../../mocks';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Product from './product';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockCamera = makeFakeCamera();
const mockReviews = [makeFakeReview(), makeFakeReview(), makeFakeReview(), makeFakeReview()];
const mockSimilarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

const store = mockStore({
  [NameSpace.Data]: {
    camera: mockCamera,
    reviews: mockReviews,
    similarCameras: mockSimilarCameras,
  },
  [NameSpace.App]: {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
  [NameSpace.Status]: {
    cameraFetchStatus: LoadingStatus.Success,
    reviewsFetchStatus: LoadingStatus.Default,
    similarCamerasFetchStatus: LoadingStatus.Default,
    reviewPostStatus: LoadingStatus.Default,
  },
});


describe('product', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store} >
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it('renders correctly with modals', async () => {
    // const onSubmit = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    const container = document.querySelector('.page-content__headed');
    const buttonAddReview = container && container.querySelector('.btn');

    if (buttonAddReview) {
      await userEvent.click(buttonAddReview);
    }

    await expect(screen.getByTestId('modal-action')).toBeInTheDocument();
    await expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();



    // await userEvent.type(screen.getByTestId("name"), 'name');
    // await userEvent.type(screen.getByTestId("plus"), 'plus');
    // await userEvent.type(screen.getByTestId("minus"), 'minus');
    // await userEvent.type(screen.getByTestId("review"), 'review');


    // const form = document.querySelector('form');
    // const buttonPost = form && form.querySelector('.form-review__btn');
    //
    // if (buttonPost) {
    //   await userEvent.click(buttonPost);
    // }
    // await expect(screen.getByTestId('modal-action')).toBeInTheDocument();

    //
    // await expect(screen.getByTestId('modal-info')).toBeInTheDocument();

    // await expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();



  });
});
