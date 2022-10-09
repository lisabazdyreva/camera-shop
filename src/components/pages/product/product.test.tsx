import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import Product from './product';

import {DefaultValue, initialReview, LoadingStatus, NameSpace} from '../../../utils/const';
import {getFakeCamera, getFakeCameras, getFakeReviews, mockStore} from '../../../utils/mocks';

const mockCamera = getFakeCamera();
const mockReviews = getFakeReviews();
const mockSimilarCameras = getFakeCameras();

const store = mockStore({
  [NameSpace.Camera]: {
    camera: mockCamera,
    cameraFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.Reviews]: {
    reviews: mockReviews,
    reviewsFetchStatus: LoadingStatus.Default,
    reviewPostStatus: LoadingStatus.Default,
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: mockSimilarCameras,
    similarCamerasFetchStatus: LoadingStatus.Default,
  },
  [NameSpace.App]: {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
    reviewFormData: initialReview,
  },
});


describe('product page component', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();
    render(
      <Provider store={store} >
        <MemoryRouter>
          <Product />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });
});
