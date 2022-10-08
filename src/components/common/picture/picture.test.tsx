import {render, screen} from '@testing-library/react';

import {Picture} from '../common';
import {makeFakePicture} from '../../../utils/mocks';

const fakePicture = makeFakePicture();

describe('picture test', () => {
  it('renders correctly', () => {
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
