import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import Catalog from './catalog';

import {getFakeCameras, getFakePromo, getMockState, mockStore} from '../../../utils/mocks';
import {LoadingStatus, NameSpace} from '../../../utils/const';

const mockCameras = getFakeCameras();
const mockPromos = [getFakePromo()];

const mockState = getMockState();
const store = mockStore(mockState);

const storeCamerasSuccess = mockStore({...mockState,
  [NameSpace.Cameras]: {
    cameras: mockCameras,
    camerasFetchStatus:  LoadingStatus.Success,
  },
});

const storeCamerasLoading = mockStore({...mockState,
  [NameSpace.Cameras]: {
    cameras: [],
    camerasFetchStatus:  LoadingStatus.Loading,
  },
});

const storeCamerasError = mockStore({...mockState,
  [NameSpace.Cameras]: {
    cameras: [],
    camerasFetchStatus:  LoadingStatus.Error,
  },
});

const storePromosSuccess = mockStore({...mockState,
  [NameSpace.Promos]: {
    promos: mockPromos,
    promosFetchStatus: LoadingStatus.Success,
  },
});

const storePromosLoading = mockStore({...mockState,
  [NameSpace.Promos]: {
    promos: [],
    promosFetchStatus: LoadingStatus.Loading,
  },
});

const storePromosError = mockStore({...mockState,
  [NameSpace.Promos]: {
    promos: [],
    promosFetchStatus: LoadingStatus.Error,
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

  it('should render correctly when cameras loaded successfully', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeCamerasSuccess}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('card')[0]).toBeInTheDocument();

    expect(window.scrollTo).toBeCalled();
  });

  it('should render loader when cameras loading', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeCamerasLoading}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();
    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });

  it('should render error information when cameras unloaded', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storeCamerasError}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();
    expect(screen.getByText(/списка камер/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });

  it('should render correctly when promos loaded successfully', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storePromosSuccess}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();
    expect(screen.getByText(/известного производителя/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });

  it('should render loader when promos loading', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storePromosLoading}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();
    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });

  it('should render error information when promos unloaded', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={storePromosError}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    window.scrollTo();
    expect(screen.getByText(/баннера/i)).toBeInTheDocument();
    expect(window.scrollTo).toBeCalled();
  });
});
