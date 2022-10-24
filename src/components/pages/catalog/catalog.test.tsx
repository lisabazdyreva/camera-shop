import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import Catalog from './catalog';

import {getFakeCamera, getFakeCameras, getFakePromo, mockStore} from '../../../utils/mocks';
import {DefaultValue, LoadingStatus, NameSpace} from '../../../utils/const';

const mockCameras = getFakeCameras();
const mockPromos = [getFakePromo()];
const mockCamera = getFakeCamera();


const store = mockStore({
  [NameSpace.Cameras]: {
    cameras: mockCameras,
    camerasFetchStatus:  LoadingStatus.Success,
  },
  [NameSpace.Camera]: {
    camera: mockCamera,
    cameraFetchStatus:  LoadingStatus.Success,
  },
  [NameSpace.Promos]: {
    promos: mockPromos,
    promosFetchStatus: LoadingStatus.Default,
  },
  [NameSpace.App]: {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
  [NameSpace.Reviews]: {
    reviewPostStatus: LoadingStatus.Default,
  },
  [NameSpace.FilterCameras]: {
    allFilters: [],
    currentFilterCategory: [],
    currentFilterType: [],
    currentFilterLevel: [],
    minPrice: 0,
    maxPrice: 0,
    lowPrice: '',
    highPrice: '',
  },
});

describe('catalog page component', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();

    expect(window.scrollTo).toBeCalled();
  });
});
