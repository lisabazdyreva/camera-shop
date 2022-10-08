import {render} from '@testing-library/react';
import {IconReview} from '../components';
import {getFakeErrorStatus, getFakeSuccessStatus} from '../../../../../utils/mocks';

const successStatus = getFakeSuccessStatus();
const errorStatus = getFakeErrorStatus();

describe('test icon review', () => {
  it('renders correctly when success', () => {
    render (
      <IconReview status={successStatus} />
    );

    const iconSVG = document.querySelector('.rotate');
    expect(iconSVG).not.toBeInTheDocument();

  });

  it('renders correctly when error', () => {
    render (
      <IconReview status={errorStatus} />
    );

    const iconSVG = document.querySelector('.rotate');
    expect(iconSVG).toBeInTheDocument();
  });
});
