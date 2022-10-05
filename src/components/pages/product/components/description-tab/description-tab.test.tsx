import {render} from '@testing-library/react';
import {DescriptionTab} from '../components';
import faker from 'faker';

const description = faker.datatype.string() + '. ' + faker.datatype.string() + '. ';

describe('description tab', () => {
  it('render correctly', () => {
    render (
      <DescriptionTab description={description}/>
    );
    //
    // const descriptionContainer = document.querySelector('.product__tabs-text');
    // const descriptionParagraphs = descriptionContainer && descriptionContainer.querySelectorAll('p');
    //
    // const descriptionParagraphsAmount = descriptionParagraphs && descriptionParagraphs.length;
    //
    // expect(descriptionParagraphsAmount).toBe( 2); TODO
  });
});
