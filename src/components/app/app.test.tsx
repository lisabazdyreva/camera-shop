import {render, screen} from '@testing-library/react';
import App from './app';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AppRoute, DefaultValue, LoadingStatus, NameSpace, PaginationRoute, TabType} from '../../utils/const';
import {HistoryRoute} from '../common/common';
import {makeFakeCamera, makeFakePromo, makeFakeReview} from '../../mocks';
import {generatePath} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';

const api = createAPI();
const history = createMemoryHistory();

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCamera = makeFakeCamera();
const mockId = mockCamera.id;
const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockSimilarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

const mockReviews = [makeFakeReview(), makeFakeReview()];
const mockPromos = [makeFakePromo()];

const store = mockStore({
  [NameSpace.Data]: {
    cameras: mockCameras,
    camera: mockCamera,
    reviews: mockReviews,
    similarCameras: mockSimilarCameras,
    promos: mockPromos,
  },
  [NameSpace.App]: {
    basket: [],
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
  [NameSpace.Status]: {
    camerasFetchStatus: LoadingStatus.Default, //?
    cameraFetchStatus: LoadingStatus.Success,
    reviewsFetchStatus: LoadingStatus.Default,
    similarCamerasFetchStatus: LoadingStatus.Default,
    promosFetchStatus: LoadingStatus.Default,
    reviewPostStatus: LoadingStatus.Default,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <App/>
    </HistoryRoute>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Такой страницы не найдено/)).toBeInTheDocument();
  });

  it('should render "Catalog" from page 1 when user navigate to catalog', () => {
    const path = generatePath(`${AppRoute.Catalog}${PaginationRoute.DefaultPage}`);

    history.push(path);

    render(fakeApp);
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it ('should render "Product" when user navigate to product', () => {
    const path = `${AppRoute.Product}/${mockId}/${TabType.Features}`;
    history.push(path);

    render(fakeApp);

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it ('should render "Basket" when user navigate to basket', () => {
    const path = AppRoute.Basket;
    history.push(path);

    render(fakeApp);

    const element = screen.getByRole('heading', {level: 1});
    expect(element.innerHTML).toBe("Корзина");

    expect(screen.getByText(/Общая цена/i)).toBeInTheDocument();
  });
});
