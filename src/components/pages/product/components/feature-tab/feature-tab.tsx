import './feature-tab.css';

import {CameraFeatures} from '../../../../../types/camera';
import {TabsList} from '../../../../../utils/const';

interface FeatureTabProps {
  data: CameraFeatures
}

const FeatureTab = ({data}: FeatureTabProps):JSX.Element => {
  const {vendorCode, category, type, level} = data;

  const TabsListElement = {
    VendorCode: vendorCode,
    Category: category,
    Type: type,
    Level: level,
  } as const;

  return (
    <ul className="product__tabs-list">
      {
        Object.values(TabsList).map((tabName, index) => {
          const element = Object.values(TabsListElement)[index];
          return (
            <li key={tabName} className="item-list">
              <span className="item-list__title">{tabName}:</span>
              <p className="item-list__text">{element}</p>
            </li>
          );
        })
      }
    </ul>
  );
};

export default FeatureTab;
