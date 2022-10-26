import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {Slider} from '../components';

import { NameSpace} from '../../../../../utils/const';
import {
  getFakeErrorStatus,
  getFakeLoadingStatus,
  getFakeSuccessStatus,
  getFakeCameras,
  mockStore,
} from '../../../../../utils/mocks';


const fakeSuccessStatus = getFakeSuccessStatus();
const fakeErrorStatus = getFakeErrorStatus();
const fakeLoadingStatus = getFakeLoadingStatus();

const fakeCameras = getFakeCameras();

const store = mockStore({
  [NameSpace.SimilarCameras]: {
    similarCameras: fakeCameras,
  },
  [NameSpace.App]: {
    basket: [],
  },
});

describe('slider component', () => {
  it('should render correctly when success status', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Slider similarCameras={fakeCameras} fetchStatus={fakeSuccessStatus} handleAddCameraModalShow={jest.fn}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('button-slider-previous')).toBeInTheDocument();
    expect(screen.getByTestId('button-slider-next')).toBeInTheDocument();
  });

  it('should render correctly when error status', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Slider similarCameras={[]} fetchStatus={fakeErrorStatus} handleAddCameraModalShow={jest.fn}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
  });

  it('should render correctly when loading status', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Slider similarCameras={[]} fetchStatus={fakeLoadingStatus} handleAddCameraModalShow={jest.fn}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });
});
