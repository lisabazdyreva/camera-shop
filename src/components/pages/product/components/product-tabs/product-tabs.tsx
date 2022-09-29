import {useState} from 'react';

interface ProductTabsProps {
  data: {
    vendorCode: string,
    category: string,
    type: string,
    level: string,
    description: string,
  }
}

const TabType = {
  Features: 'features',
  Description: 'description',
} as const;

const TabDictionary = {
  Features: 'Характеристики',
  Description: 'Описание',
} as const;

const TabsList = {
  VendorCode: 'Артикул',
  Category: 'Категория',
  Type: 'Тип камеры',
  Level: 'Уровень',
} as const;


const tabTypes = Object.values(TabType);
const tabNames = Object.values(TabDictionary);
const tabsListNames = Object.values(TabsList);

const ProductTabs = ({data}: ProductTabsProps) => {
  const {vendorCode, category, type, level, description} = data;
  const [currentTab, setCurrentTab] = useState<typeof TabType[keyof typeof TabType]>(TabType.Features);

  const TabsListElement = {
    VendorCode: vendorCode,
    Category: category,
    Type: type,
    Level: level,
  } as const;

  const tabsListElements = Object.values(TabsListElement);


  const handleTabButton = (tabType: typeof TabType[keyof typeof TabType]) => {
    setCurrentTab(tabType);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {
          tabTypes.map((tabType, index) => {
            const buttonClasses = `tabs__control ${currentTab === tabType && 'is-active'}`;
            const name = tabNames[index];

            return (
              <button key={tabType} className={buttonClasses} type="button" onClick={() => handleTabButton(tabType)}>{name}</button>
            );
          })
        }
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          {
            currentTab === TabType.Description
              ?
              <ul className="product__tabs-list">
                {
                  tabsListNames.map((tabName, index) => {
                    const element = tabsListElements[index];
                    return (
                      <li key={tabName} className="item-list"><span className="item-list__title">{tabName}:</span>
                        <p className="item-list__text">{element}</p>
                      </li>
                    );
                  })
                }
              </ul>
              :
              <div className="product__tabs-text">
                {description}
              </div>
          }
          {/*<p>*/}
          {/*  Немецкий концерн BRW разработал видеокамеру Das Auge IV в&nbsp;начале 80-х годов, однако*/}
          {/*  она до&nbsp;сих пор пользуется популярностью среди коллекционеров и&nbsp;яростных*/}
          {/*  почитателей старинной техники.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот*/}
          {/*  чудо-аппарат. Кто знает, может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь к&nbsp;наградам*/}
          {/*  всех престижных кинофестивалей.*/}
          {/*</p>*/}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
