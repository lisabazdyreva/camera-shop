import {render, screen} from '@testing-library/react';
import {FeatureTab} from '../components';
import faker from 'faker';

const fakeData = {
  vendorCode: faker.datatype.string(),
  category: faker.datatype.string(),
  type: faker.datatype.string(),
  level: faker.datatype.string(),
};


describe('feature tab', () => {
  it('renders correctly', () => {
    render(
      <FeatureTab data={fakeData} />
    );

    const featureItem = document.querySelectorAll('.item-list');
    const featureItemsLength = featureItem && featureItem.length;

    expect(featureItemsLength).toBe(4);
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
  });
});
