import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {Breadcrumbs} from '../common';
import {BreadcrumbsItem, ComponentName, DefaultValue, NameSpace} from '../../../utils/const';
import {mockStore} from '../../../utils/mocks';

const store = mockStore({
  [NameSpace.App] : {
    currentCatalogPage: DefaultValue.CatalogPageNumber,
  },
});

describe('breadcrumbs component', () => {
  it('should render correctly without link', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Basket} breadcrumbItems={BreadcrumbsItem.Basket} />
        </MemoryRouter>
      </Provider>
    );
    const breadcrumbsList = screen.getByRole('list');
    expect(breadcrumbsList).toBeInTheDocument();

    expect(breadcrumbsList.childNodes.length).toBe(2);
  });

  it('should render correctly on basket page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Basket} breadcrumbItems={BreadcrumbsItem.Basket} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();
  });

  it('should render correctly on catalog page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Catalog} breadcrumbItems={BreadcrumbsItem.Catalog} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
  });

  it('should render correctly on product page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Breadcrumbs usingComponent={ComponentName.Product} breadcrumbItems={BreadcrumbsItem.Product} />
        </MemoryRouter>
      </Provider>
    );

    const breadcrumbsList = screen.getByRole('list');
    expect(breadcrumbsList).toBeInTheDocument();

    expect(breadcrumbsList.childNodes.length).toBe(3);
  });
});
