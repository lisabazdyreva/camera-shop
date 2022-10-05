import {useNavigate, useParams} from 'react-router-dom';
import {DescriptionTab, FeatureTab} from '../components';
import {AppRoute, TabType} from '../../../../../utils/const';
import {tabTypes, tabNames} from '../../../../../utils/utils';

interface ProductTabsProps {
  data: {
    vendorCode: string,
    category: string,
    type: string,
    level: string,
    description: string,
  }
}

const ProductTabs = ({data}: ProductTabsProps) => {
  const params = useParams();
  const {id, tab} = params;

  const navigation = useNavigate();
  const {description, vendorCode, category, type, level} = data;

  const handleTabButton = (tabType: typeof TabType[keyof typeof TabType]) => {
    navigation(`${AppRoute.Product}/${id}/${tabType}`);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {
          tabTypes.map((tabType, index) => {
            const buttonClasses = `tabs__control ${tab === tabType && 'is-active'}`;
            const name = tabNames[index];
            return (
              <button
                key={tabType}
                className={buttonClasses}
                type="button"
                onClick={() => handleTabButton(tabType)}
              >
                {name}
              </button>
            );
          })
        }
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          {
            tab === TabType.Description
              ? <DescriptionTab description={description} />
              : <FeatureTab data={{vendorCode, category, type, level}} />
          }
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
