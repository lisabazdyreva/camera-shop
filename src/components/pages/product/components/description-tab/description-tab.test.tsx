import {render} from '@testing-library/react';

import {DescriptionTab} from '../components';
import {makeFakeLongDescription, makeFakeShortDescription} from '../../../../../utils/mocks';

const descriptionLong = makeFakeLongDescription();
const descriptionShort = makeFakeShortDescription();

describe('description tab test', () => {
  it('render correctly with long description', () => {
    render (
      <DescriptionTab description={descriptionLong}/>
    );

    const descriptionContainer = document.querySelector('.product__tabs-text');
    const descriptionParagraphs = descriptionContainer && descriptionContainer.querySelectorAll('p');

    const descriptionParagraphsAmount = descriptionParagraphs && descriptionParagraphs.length;

    expect(descriptionParagraphsAmount).toBe( 2);
  });

  it('render correctly with short description', () => {
    render (
      <DescriptionTab description={descriptionShort}/>
    );

    const descriptionContainer = document.querySelector('.product__tabs-text');
    const descriptionParagraphs = descriptionContainer && descriptionContainer.querySelectorAll('p');

    const descriptionParagraphsAmount = descriptionParagraphs && descriptionParagraphs.length;

    expect(descriptionParagraphsAmount).toBe( 1);
  });
});
