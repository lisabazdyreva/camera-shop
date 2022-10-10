import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {ProductTabs} from '../components';

import {getFakeDataTabs} from '../../../../../utils/mocks';

const fakeDataTabs = getFakeDataTabs();

describe('product tabs component', () => {
  it ('should render correctly', () => {
    render (
      <MemoryRouter>
        <ProductTabs data={fakeDataTabs} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
  });
});
