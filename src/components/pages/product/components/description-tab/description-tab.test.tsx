import {render, screen} from '@testing-library/react';

import {DescriptionTab} from '../components';
import {getFakeLongDescription, getFakeShortDescription} from '../../../../../utils/mocks';

const descriptionLong = getFakeLongDescription();
const descriptionShort = getFakeShortDescription();

describe('description tab component', () => {
  it('should render correctly with long description', () => {
    render (
      <DescriptionTab description={descriptionLong}/>
    );
    const paragraphs = screen.getByTestId('product-tabs');
    expect(paragraphs.childNodes.length).toBe( 2);
  });

  it('should render correctly with short description', () => {
    render (
      <DescriptionTab description={descriptionShort}/>
    );
    const paragraphs = screen.getByTestId('product-tabs');
    expect(paragraphs.childNodes.length).toBe( 1);
  });
});
