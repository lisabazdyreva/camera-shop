import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {ProductContent} from '../components';

import {getFakeCamera, getFakeCameras, getFakeReviews, getMockState, mockStore} from '../../../../../utils/mocks';
import {LoadingStatus, NameSpace} from '../../../../../utils/const';


const mockState = getMockState();
const store = mockStore(mockState);
const fakeCamera = getFakeCamera();

const storeCameraSuccess = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: fakeCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
});

const storeCameraError = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: null,
    cameraFetchStatus: LoadingStatus.Error,
  },
});

const storeCameraLoading = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: null,
    cameraFetchStatus: LoadingStatus.Loading,
  },
});

const storeSimilarCamerasSuccess = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: fakeCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: getFakeCameras(),
    similarCamerasFetchStatus: LoadingStatus.Success,
  },
});

const storeSimilarCamerasLoading = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: fakeCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: [],
    similarCamerasFetchStatus: LoadingStatus.Loading,
  },
});

const storeSimilarCamerasError = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: fakeCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: [],
    similarCamerasFetchStatus: LoadingStatus.Error,
  },
});

const storeReviewsSuccess = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: fakeCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.Reviews]: {
    reviewsFetchStatus: LoadingStatus.Success,
    reviews: getFakeReviews(),
  },
});

const storeReviewsLoading = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: fakeCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.Reviews]: {
    reviewsFetchStatus: LoadingStatus.Loading,
    reviews: [],
  },
});

const storeReviewsError = mockStore({...mockState,
  [NameSpace.Camera]: {
    camera: fakeCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.Reviews]: {
    reviewsFetchStatus: LoadingStatus.Error,
    reviews: [],
  },
});

describe('product content component', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <ProductContent camera={null} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
  });

  it('should render product information when camera loaded successfully', () => {
    render (
      <Provider store={storeCameraSuccess}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('should render error information when camera unloaded', () => {
    render (
      <Provider store={storeCameraError}>
        <MemoryRouter>
          <ProductContent camera={null} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/информации о камере/i)).toBeInTheDocument();
  });

  it('should render loader when camera loading', () => {
    render (
      <Provider store={storeCameraLoading}>
        <MemoryRouter>
          <ProductContent camera={null} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });

  it('should render similar cameras when similar cameras loaded successfully', () => {
    render (
      <Provider store={storeSimilarCamerasSuccess}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('button-slider-previous')).toBeInTheDocument();
  });

  it('should render loader when similar cameras loading', () => {
    render (
      <Provider store={storeSimilarCamerasLoading}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });

  it('should render error information when similar cameras error', () => {
    render (
      <Provider store={storeSimilarCamerasError}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/списка камер/i)).toBeInTheDocument();
  });

  it('should render reviews when review loaded successfully', () => {
    render (
      <Provider store={storeReviewsSuccess}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Показать больше отзывов/i)).toBeInTheDocument();
  });

  it('should render loader when review loading', () => {
    render (
      <Provider store={storeReviewsLoading}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });

  it('should render error information when review unloaded', () => {
    render (
      <Provider store={storeReviewsError}>
        <MemoryRouter>
          <ProductContent camera={fakeCamera} onCameraAddToBasket={jest.fn} onButtonAddReviewClick={jest.fn} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/отзывов/i)).toBeInTheDocument();
  });

});
