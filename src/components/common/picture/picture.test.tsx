import faker from 'faker';
import {render, screen} from '@testing-library/react';
import {Picture} from '../common';

const fakePicture = {
  width: faker.datatype.number(),
  height: faker.datatype.number(),
  alt: faker.datatype.string(),
  src: faker.datatype.string(),
  srcSetImg: faker.datatype.string(),
  srcSetSource: [faker.datatype.string(), faker.datatype.string()],
}

describe('picture test', () => {
  it('renders correctly', () => {
    render (
      <Picture
        width={fakePicture.width}
        height={fakePicture.height}
        alt={fakePicture.alt}
        src={fakePicture.src}
        srcSetImg={fakePicture.srcSetImg}
        srcSetSource={fakePicture.srcSetSource}/>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
