import {render, screen} from '@testing-library/react';

import {FeatureTab} from '../components';
import {makeFakeProductFeatures} from '../../../../../utils/mocks';

const fakeFeatures = makeFakeProductFeatures();


describe('feature tab test', () => {
  it('renders correctly', () => {
    render(
      <FeatureTab data={fakeFeatures} />
    );

    const featureItem = document.querySelectorAll('.item-list');
    const featureItemsLength = featureItem && featureItem.length;

    expect(featureItemsLength).toBe(4);
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
  });
});
