import {render, screen} from '@testing-library/react';
import {ProductTabs} from '../components';
import {MemoryRouter} from 'react-router-dom';
import faker from 'faker';

const fakeDataTabs = {
  vendorCode: faker.datatype.string(),
  category: faker.datatype.string(),
  type: faker.datatype.string(),
  level: faker.datatype.string(),
  description: faker.datatype.string(),
};

describe('product tabs', () => {
  it ('renders correctly', () => {
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
