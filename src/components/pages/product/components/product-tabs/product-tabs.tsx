import './product-tabs.css';

import {useNavigate, useParams} from 'react-router-dom';

import {DescriptionTab, FeatureTab} from '../components';

import {AppRoute, TabDictionary, TabType} from '../../../../../utils/const';
import {CameraFeatures} from '../../../../../types/camera';
import {TabsType} from '../../../../../types/types';

interface ProductTabsProps {
  data: CameraFeatures & {description: string};
}

const ProductTabs = ({data}: ProductTabsProps):JSX.Element => {
  const params = useParams();
  const navigation = useNavigate();

  const {id, tab} = params;
  const {description, vendorCode, category, type, level} = data;

  const handleTabButtonClick = (tabType: TabsType) => {
    navigation(`${AppRoute.Product}/${id}/${tabType}`);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {
          Object.values(TabType).map((tabType, index) => {
            const buttonClasses = `tabs__control ${tab === tabType && 'is-active'}`;
            const name = Object.values(TabDictionary)[index];
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
