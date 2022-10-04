import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Basket from './basket';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {DefaultValue, LoadingStatus, NameSpace} from '../../../utils/const';
import {makeFakeCamera, makeFakePromo, makeFakeReview} from '../../../mocks';
import thunk from 'redux-thunk';
import {createAPI} from '../../../services/api';



const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockCamera = makeFakeCamera();
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
});
