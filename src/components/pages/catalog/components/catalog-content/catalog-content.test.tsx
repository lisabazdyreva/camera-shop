import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {CatalogContent} from '../components';

import {getFakeCameras, mockStore} from '../../../../../utils/mocks';
import {LoadingStatus, NameSpace} from '../../../../../utils/const';


const mockCameras = getFakeCameras();

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

describe('catalog content component', () => {
  it('should render catalog content with data', () => {
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

  it ('should render error message when it is error in data', () => {
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
