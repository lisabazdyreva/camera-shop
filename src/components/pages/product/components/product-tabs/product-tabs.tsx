import {useNavigate, useParams} from 'react-router-dom';

import {DescriptionTab, FeatureTab} from '../components';

import {AppRoute, TabType} from '../../../../../utils/const';
import {tabTypes, tabNames} from '../../../../../utils/utils';
import {CameraFeatures} from '../../../../../types/camera';

interface ProductTabsProps {
  data: CameraFeatures & {description: string};
}

const ProductTabs = ({data}: ProductTabsProps):JSX.Element => {
  const params = useParams();
  const navigation = useNavigate();

  const {id, tab} = params;
  const {description, vendorCode, category, type, level} = data;

  const handleTabButtonClick = (tabType: typeof TabType[keyof typeof TabType]) => {
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
                onClick={() => handleTabButtonClick(tabType)}
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
