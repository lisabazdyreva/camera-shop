import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {Banner} from '../components';

import {getFakeCamera, getFakePromo, mockStore} from '../../../../../utils/mocks';
import {LOADER_NOTIFICATION, LoadingStatus, NameSpace} from '../../../../../utils/const';


const mockPromos = [getFakePromo()];
const mockCamera = {...getFakeCamera(), ...{id: mockPromos[0].id}};


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

const storeError = mockStore({
  [NameSpace.Promos]: {
    promos: [],
    promosFetchStatus: LoadingStatus.Error,
  },
  [NameSpace.Camera]: {
    camera: null,
  }
});


describe('banner component', () => {
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
