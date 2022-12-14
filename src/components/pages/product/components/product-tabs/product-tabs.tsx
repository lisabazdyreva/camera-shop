import './product-tabs.css';

import {SyntheticEvent} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {DescriptionTab, FeatureTab} from '../components';
import {ACTIVE_CLASS, AppRoute, TabDictionary, TabType} from '../../../../../utils/const';
import {CameraFeatures} from '../../../../../types/camera';


interface ProductTabsProps {
  data: CameraFeatures & {description: string};
}

const ProductTabs = ({data}: ProductTabsProps):JSX.Element => {
  const params = useParams();

  const navigation = useNavigate();

  const {id, tab} = params;
  const {description, vendorCode, category, type, level} = data;

  const handleTabButtonClick = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLElement;
    navigation(`${AppRoute.Product}/${id}/${target.dataset.tab}`);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {
          Object.values(TabType).map((tabType, index) => {
            const buttonClasses = `tabs__control ${tab === tabType && ACTIVE_CLASS}`;
            const name = Object.values(TabDictionary)[index];
            return (
              <button
                key={tabType}
                className={buttonClasses}
                type="button"
                onClick={handleTabButtonClick}
                data-tab={tabType}
              >
                {name}
              </button>
            );
          })
        }
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          {tab === TabType.Description ? <DescriptionTab description={description} /> : <FeatureTab data={{vendorCode, category, type, level}} />}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
