import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {DescriptionTab, FeatureTab} from '../components';
import {AppRoute} from '../../../../../utils/const';

interface ProductTabsProps {
  data: {
    vendorCode: string,
    category: string,
    type: string,
    level: string,
    description: string,
  }
}

export const TabType = {
  Features: 'features',
  Description: 'description',
} as const;


const TabDictionary = {
  Features: 'Характеристики',
  Description: 'Описание',
} as const;


const tabTypes = Object.values(TabType);
const tabNames = Object.values(TabDictionary);


const ProductTabs = ({data}: ProductTabsProps) => {
  const params = useParams();
  const {id, tab} = params;

  const navigation = useNavigate();
  const {description, vendorCode, category, type, level} = data;
  const [currentTab, setCurrentTab] = useState<typeof TabType[keyof typeof TabType]>(TabType.Features);


  // vendorCode, category, type, level,
  const handleTabButton = (tabType: typeof TabType[keyof typeof TabType]) => {
    setCurrentTab(tabType);
    navigation(`${AppRoute.Product}/${id}/${tabType}`);
  };
  //eslint-disable-next-line
  // console.log(tab);
  // console.log(`${location.pathname}/${TabType.Features}`);
  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {
          tabTypes.map((tabType, index) => {
            const buttonClasses = `tabs__control ${currentTab === tabType && 'is-active'}`; // TODO bug when select from slider
            const name = tabNames[index];

            return (
              <button key={tabType} className={buttonClasses} type="button" onClick={() => handleTabButton(tabType)}>{name}</button>
            );
          })
        }
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          {tab === TabType.Features ? <FeatureTab data={{vendorCode, category, type, level}}/> : <DescriptionTab description={description} />}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
