import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';

import {Slider} from '../components';

import { NameSpace} from '../../../../../utils/const';
import {
  getFakeErrorStatus,
  getFakeLoadingStatus,
  getFakeSuccessStatus,
  makeFakeCamera
} from '../../../../../utils/mocks';
import {createAPI} from '../../../../../services/api';


const api = createAPI();

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const fakeSuccessStatus = getFakeSuccessStatus();
const fakeErrorStatus = getFakeErrorStatus();
const fakeLoadingStatus = getFakeLoadingStatus();

const fakeCameras = [
  makeFakeCamera(), makeFakeCamera(),
  makeFakeCamera(), makeFakeCamera(),
  makeFakeCamera(), makeFakeCamera(),
  makeFakeCamera(),
];

const store = mockStore({
  [NameSpace.SimilarCameras]: {
    similarCameras: fakeCameras,
  },
  [NameSpace.App]: {
    basket: [],
  },
});

describe('slider test', () => {
  it('slider render correctly when success status', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Slider similarCameras={fakeCameras} fetchStatus={fakeSuccessStatus} />
        </MemoryRouter>
      </Provider>
    );

    const prevButton = document.querySelector('[aria-label="Предыдущий слайд"]');
    const nextButton = document.querySelector('[aria-label="Следующий слайд"]');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('slider render correctly when error-info status', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Slider similarCameras={[]} fetchStatus={fakeErrorStatus} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Произошла ошибка при загрузке/i)).toBeInTheDocument();
  });

  it('slider render correctly when loading status', () => {
    render (
      <Provider store={store}>
        <MemoryRouter>
          <Slider similarCameras={[]} fetchStatus={fakeLoadingStatus} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Идёт загрузка/i)).toBeInTheDocument();
  });
});
