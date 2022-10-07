import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {Banner} from '../components';

import {makeFakeCamera, makeFakePromo} from '../../../../../utils/mocks';
import {LOADER_NOTIFICATION, LoadingStatus, NameSpace} from '../../../../../utils/const';
import {createAPI} from '../../../../../services/api';

const mockPromos = [makeFakePromo()];
const mockCamera = {...makeFakeCamera(), ...{id: mockPromos[0].id}};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const storeSuccess = mockStore({
  [NameSpace.Promos]: {
    promos: mockPromos,
    promosFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.Camera]: {
    camera: mockCamera,
  }
});

const storeLoading = mockStore({
  [NameSpace.Promos]: {
    promos: [],
    promosFetchStatus: LoadingStatus.Loading,
  },
  [NameSpace.Camera]: {
    camera: null,
  }
});

const storeError= mockStore({
  [NameSpace.Promos]: {
    promos: [],
    promosFetchStatus: LoadingStatus.Error,
  },
  [NameSpace.Camera]: {
    camera: null,
  }
});



describe('banner tests', () => {
  it('should render banner correctly when promo downloaded', () => {
    render (
      <Provider store={storeSuccess}>
        <MemoryRouter>
          <Banner/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/известного производителя/i)).toBeInTheDocument();
    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
  });

  it('should render loading when promos is loading', () => {
    render (
      <Provider store={storeLoading}>
        <MemoryRouter>
          <Banner/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(LOADER_NOTIFICATION)).toBeInTheDocument();
  });

  it('should render error information when error occurs', () => {
    render (
      <Provider store={storeError}>
        <MemoryRouter>
          <Banner/>
        </MemoryRouter>
      </Provider>
    );

    const img = screen.queryByAltText('баннер');
    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
    expect(img).not.toBeInTheDocument();
  });
});
