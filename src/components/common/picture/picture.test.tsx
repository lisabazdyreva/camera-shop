import {render, screen} from '@testing-library/react';

import {Picture} from '../common';
import {getFakePicture} from '../../../utils/mocks';

const fakePicture = getFakePicture();

describe('picture component', () => {
  it('should render correctly', () => {
    render (
      <Picture
        width={fakePicture.width}
        height={fakePicture.height}
        alt={fakePicture.alt}
        src={fakePicture.src}
        srcSetImg={fakePicture.srcSetImg}
        srcSetSource={fakePicture.srcSetSource}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
