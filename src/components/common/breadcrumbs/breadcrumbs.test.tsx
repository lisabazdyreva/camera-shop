import {render, screen} from '@testing-library/react';
import {Breadcrumbs} from '../common';
import {BreadcrumbsItem, ComponentName, DefaultValue, NameSpace} from '../../../utils/const';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {MemoryRouter} from 'react-router-dom';

const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.App] : {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
});

describe('breadcrumbs', () => {
  it('renders correctly without link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Basket} breadcrumbItems={BreadcrumbsItem.Basket} />
        </MemoryRouter>
      </Provider>
    );
    const breadcrumbsList = document.querySelector('.breadcrumbs__list');
    expect(breadcrumbsList).toBeInTheDocument();

    const breadcrumbsItems = breadcrumbsList && breadcrumbsList.childNodes;
    const breadcrumbsAmount = breadcrumbsItems && breadcrumbsItems.length;

    expect(breadcrumbsAmount).toBe(2);
  });

  it('renders correctly on basket page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Basket} breadcrumbItems={BreadcrumbsItem.Basket} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();
  });

  it('renders correctly on catalog page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Catalog} breadcrumbItems={BreadcrumbsItem.Catalog} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();

  });

  it('renders correctly on product page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Product} breadcrumbItems={BreadcrumbsItem.Product} />
        </MemoryRouter>
      </Provider>
    );

    const breadcrumbsList = document.querySelector('.breadcrumbs__list');

    const breadcrumbsItems = breadcrumbsList && breadcrumbsList.childNodes;
    const breadcrumbsAmount = breadcrumbsItems && breadcrumbsItems.length;

    expect(breadcrumbsAmount).toBe(3);

    const breadcrumbsLink = document.querySelector('.breadcrumbs__link');
    expect(breadcrumbsLink).toBeInTheDocument();
  });
});
