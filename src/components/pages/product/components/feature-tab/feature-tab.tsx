
interface FeatureTabProps {
  data: {
    vendorCode: string,
    category: string,
    type: string,
    level: string,
  }
}

const TabsList = {
  VendorCode: 'Артикул',
  Category: 'Категория',
  Type: 'Тип камеры',
  Level: 'Уровень',
} as const;


const FeatureTab = ({data}: FeatureTabProps) => {
  const {vendorCode, category, type, level} = data;

  const TabsListElement = {
    VendorCode: vendorCode,
    Category: category,
    Type: type,
    Level: level,
  } as const;


  const tabsListNames = Object.values(TabsList);
  const tabsListElements = Object.values(TabsListElement);

  return (
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
  );
};

export default FeatureTab;