import {render, screen} from '@testing-library/react';
import {WarningInfo} from '../common';
import {fakeText} from '../../../utils/mocks';


describe('warning ifo component', () => {
  it('should render correctly', () => {
    render(
      <WarningInfo text={fakeText} />
    );
    expect(screen.getByText(fakeText)).toBeInTheDocument();
  });
});
