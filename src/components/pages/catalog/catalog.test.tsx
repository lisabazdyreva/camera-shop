import {createAPI} from '../../../services/api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeCamera, makeFakePromo} from '../../../mocks';
import {DefaultValue, LoadingStatus, NameSpace} from '../../../utils/const';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Catalog from './catalog';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const mockCameras = [makeFakeCamera(), makeFakeCamera()];
const mockPromos = [makeFakePromo()];

const store = mockStore({
  [NameSpace.Data]: {
    cameras: mockCameras,
    promos: mockPromos,
  },
  [NameSpace.App]: {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
  [NameSpace.Status]: {
    camerasFetchStatus: LoadingStatus.Success,
    promosFetchStatus: LoadingStatus.Default,
  },
});

describe('Render Catalog correctly', () => {
  it('should render catalog', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-content')).toBeInTheDocument();
  });

  it ('should render catalog with modals', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    const button = document.querySelector('.product-card__btn');

    if (button) {
      await userEvent.click(button);
    }

    await expect(screen.getByTestId('modal-action')).toBeInTheDocument();

    const buttonConfirm = await document.querySelector('.modal__btn');

    if (buttonConfirm) {
      await userEvent.click(buttonConfirm);
    }

    await expect(screen.getByTestId('modal-info')).toBeInTheDocument();

    const buttonClose = await document.querySelector('.cross-btn');

    if (buttonClose) {
      await userEvent.click(buttonClose);
    }

    await expect(buttonClose).not.toBeInTheDocument();
  });
});
