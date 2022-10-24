import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {generatePath} from 'react-router-dom';

import App from './app';

import {AppRoute, PaginationRoute, TabType} from '../../utils/const';
import {HistoryRoute} from '../common/common';
import {getFakeCamera, mockStore, getMockState} from '../../utils/mocks';


const history = createMemoryHistory();

const mockCamera = getFakeCamera();
const mockId = mockCamera.id;

const mockState = getMockState();
const store = mockStore(mockState);

const fakeApp = (
  <Provider store={store}>
    <HistoryRoute history={history}>
      <App/>
    </HistoryRoute>
  </Provider>
);

describe('Application Routing', () => {
  window.scrollTo = jest.fn();

  it('should render "NotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Такой страницы не найдено/)).toBeInTheDocument();
  });

  it('should render "Catalog" from page 1 when user navigate to catalog', () => {
    const path = generatePath(`${AppRoute.Catalog}${PaginationRoute.DefaultPage}`);

    history.push(path);

    render(fakeApp);
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it ('should render "Product" when user navigate to product', () => {
    const path = `${AppRoute.Product}/${mockId}/${TabType.Features}`;
    history.push(path);

    render(fakeApp);

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it ('should render "Basket" when user navigate to basket', () => {
    const path = AppRoute.Basket;
    history.push(path);

    render(fakeApp);

    const element = screen.getByRole('heading', {level: 1});
    expect(element.innerHTML).toBe('Корзина');

    expect(screen.getByText(/Общая цена/i)).toBeInTheDocument();
  });

});
