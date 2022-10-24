import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {Search} from '../common';
import {mockStore} from '../../../utils/mocks';
import {LoadingStatus, NameSpace} from '../../../utils/const';


const store = mockStore({
  [NameSpace.Cameras]: {
    searchedCameras: [],
    searchedCamerasFetchStatus: LoadingStatus.Default,
  }
});

const storeError = mockStore({
  [NameSpace.Cameras]: {
    searchedCameras: [],
    searchedCamerasFetchStatus: LoadingStatus.Error,
  }
});

const storeLoading = mockStore({
  [NameSpace.Cameras]: {
    searchedCameras: [],
    searchedCamerasFetchStatus: LoadingStatus.Loading,
  }
});

describe('search component', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
    expect(screen.getByTestId('form-search')).toBeInTheDocument();
  });

  it('should render correctly when loading status is error', () => {
    render(
      <Provider store={storeError}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/При загрузке произошла ошибка/i)).toBeInTheDocument();
  });

  it('should render correctly when loading status is loading', () => {
    render(
      <Provider store={storeLoading}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });
});
