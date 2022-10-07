import {render, screen} from '@testing-library/react';
import {Slider} from '../components';
import {LoadingStatus, NameSpace} from '../../../../../utils/const';
import {makeFakeCamera} from '../../../../../utils/mocks';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {createAPI} from '../../../../../services/api';
import {MemoryRouter} from 'react-router-dom';

const api = createAPI();

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const fakeSuccessStatus = LoadingStatus.Success;
const fakeErrorStatus = LoadingStatus.Error;
const fakeLoadingStatus = LoadingStatus.Loading;

const fakeCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

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
