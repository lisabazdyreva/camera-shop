import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {ProductTabs} from '../components';

import {makeFakeDataTabs} from '../../../../../utils/mocks';

const fakeDataTabs = makeFakeDataTabs();

describe('product tabs test', () => {
  it ('renders correctly', () => {
    render (
      <MemoryRouter>
        <ProductTabs data={fakeDataTabs} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument(); //TODO click case?
  });
});
