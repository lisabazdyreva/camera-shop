import {render, screen} from '@testing-library/react';
import {IconReview} from '../components';
import {getFakeErrorStatus, getFakeSuccessStatus} from '../../../../../utils/mocks';

const successStatus = getFakeSuccessStatus();
const errorStatus = getFakeErrorStatus();

describe('icon review component', () => {
  it('should render correctly when success', () => {
    render (
      <IconReview status={successStatus} />
    );

    const iconSVGSuccess = screen.getByTestId('review-icon-svg-success');
    const iconSVGError = screen.queryByTestId('review-icon-svg-error');

    expect(iconSVGSuccess).toBeInTheDocument();
    expect(iconSVGError).not.toBeInTheDocument();
  });

  it('should render correctly when error', () => {
    render (
      <IconReview status={errorStatus} />
    );

    const iconSVGError = screen.getByTestId('review-icon-svg-error');
    const iconSVGSuccess = screen.queryByTestId('review-icon-svg-success');

    expect(iconSVGError).toBeInTheDocument();
    expect(iconSVGSuccess).not.toBeInTheDocument();
  });
});
