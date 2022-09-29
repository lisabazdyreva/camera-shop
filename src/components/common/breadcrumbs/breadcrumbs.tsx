import {Link} from 'react-router-dom';
import {ComponentName, ComponentNameType, BreadcrumbsItemBasketType, BreadcrumbsItemCatalogType, BreadcrumbsItemProductType, BreadcrumbsItem} from '../../../utils/const';
import {Camera} from '../../../types/types';
import {useSelector} from 'react-redux';
import {getCurrentPage} from '../../../store/app-process/selectors';


interface BreadcrumbsProps {
  data?: Camera;
  usingComponent: ComponentNameType;
  breadcrumbItems: BreadcrumbsItemProductType | BreadcrumbsItemBasketType | BreadcrumbsItemCatalogType,
}

const BreadcrumbsLink = {
  Main: '/',
  Catalog: '/catalog/page_',
} as const;

const breadcrumbsLinks = Object.values(BreadcrumbsLink);

const Breadcrumbs = ({data, usingComponent, breadcrumbItems}: BreadcrumbsProps) => {

  const items = Object.values(breadcrumbItems);

  const currentPage = useSelector(getCurrentPage);
  let name: string;
  if (data) {
    name = data.name;
  }

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {
            items.map((item, index) => {
              const catalogPageLink = item === BreadcrumbsItem.Product.Catalog && usingComponent === ComponentName.Product && `${breadcrumbsLinks[index]}${currentPage}`;
              const mainLink = breadcrumbsLinks[0];

              const linkElement = (
                <Link className="breadcrumbs__link" to={catalogPageLink || mainLink}>
                  {item}
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              );

              const textElement = <span className="breadcrumbs__link breadcrumbs__link--active">{name || item}</span>;

              return (
                <li className="breadcrumbs__item" key={item}>
                  {index === items.length - 1 ? textElement : linkElement}
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
