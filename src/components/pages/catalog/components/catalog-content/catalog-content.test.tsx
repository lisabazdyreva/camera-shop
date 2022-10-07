import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

import {CatalogContent} from '../components';

import {makeFakeCamera} from '../../../../../utils/mocks';
import {LoadingStatus, NameSpace} from '../../../../../utils/const';
import {createAPI} from '../../../../../services/api';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

const successStore = mockStore({
  [NameSpace.Cameras]: {
    cameras: mockCameras,
    camerasFetchStatus: LoadingStatus.Success,
  },
  [NameSpace.App]: {
    camerasTotalCount: mockCameras.length,
  },
});

const loadingStore = mockStore({
  [NameSpace.Cameras]: {
    cameras: [],
    camerasFetchStatus: LoadingStatus.Loading,
  },
  [NameSpace.App]: {
    camerasTotalCount: 0,
  },
});

const errorStore = mockStore({
  [NameSpace.Cameras]: {
    cameras: [],
    camerasFetchStatus: LoadingStatus.Error,
  },
  [NameSpace.App]: {
    camerasTotalCount: 0,
  },
});

describe('Render Catalog correctly', () => {
  it('should render catalog with data', () => {
    render (
      <Provider store={successStore}>
        <MemoryRouter>
            <CatalogContent
              handleAddModal={jest.fn()}
              currentPageNumber={1}
              setCurrentPageNumber={jest.fn()}
            />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();
  });

  it ('should render error-info message when it is error-info in data', () => {
    render (
      <Provider store={errorStore}>
        <MemoryRouter>
          <CatalogContent
            handleAddModal={jest.fn()}
            currentPageNumber={1}
            setCurrentPageNumber={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
  });

  it ('should render loader when it is loading data', () => {
    render (
      <Provider store={loadingStore}>
        <MemoryRouter>
          <CatalogContent
            handleAddModal={jest.fn()}
            currentPageNumber={1}
            setCurrentPageNumber={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });
});
