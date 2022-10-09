import {render, screen} from '@testing-library/react';

import {FeatureTab} from '../components';
import {getFakeProductFeatures} from '../../../../../utils/mocks';

const fakeFeatures = getFakeProductFeatures();

describe('feature tab component', () => {
  it('should render correctly', () => {
    render(
      <FeatureTab data={fakeFeatures} />
    );
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(4);
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
  });
});
