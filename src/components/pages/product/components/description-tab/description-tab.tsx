import './description-tab.css';

import {DescriptionLength} from '../../../../../utils/const';

interface DescriptionTabProps {
  description: string;
}

const DescriptionTab = ({description}: DescriptionTabProps):JSX.Element => {
  let paragraph;
  let firstParagraph;
  let secondParagraph;

  const sentences = description.trim().split('.').filter((sentence) => sentence !== '');

  switch (sentences.length) {
    case DescriptionLength.Short:
      paragraph = <p>{description}</p>;
      break;
    case DescriptionLength.Medium:
      paragraph = <p>{`${sentences.join('.')}.`}</p>;
      break;
    default:
      firstParagraph = <p>{`${sentences[0]}.`}</p>;
      secondParagraph = <p>{[`${sentences[1]}.`, `${sentences[2]}.`]}</p>;
      break;
  }

  const isLong = sentences.length !== DescriptionLength.Medium && sentences.length !== DescriptionLength.Short;

  return (
    <div className="product__tabs-text" data-testid='product-tabs'>
      { isLong ? (<>{firstParagraph}{secondParagraph}</>) : paragraph}
    </div>
  );
};

export default DescriptionTab;
