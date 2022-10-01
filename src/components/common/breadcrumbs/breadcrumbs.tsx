import {Link} from 'react-router-dom';
import {ComponentName, ComponentNameType, BreadcrumbsItemBasketType, BreadcrumbsItemCatalogType, BreadcrumbsItemProductType, BreadcrumbsItem} from '../../../utils/const';
import {Camera} from '../../../types/types';
import {useSelector} from 'react-redux';
import {getCurrentPage} from '../../../store/app-process/selectors';
import {breadcrumbsLinks} from '../../../utils/utils';


interface BreadcrumbsProps {
  data?: Camera;
  usingComponent: ComponentNameType;
  breadcrumbItems: BreadcrumbsItemProductType | BreadcrumbsItemBasketType | BreadcrumbsItemCatalogType,
}

const Breadcrumbs = ({data, usingComponent, breadcrumbItems}: BreadcrumbsProps) => {
  const breadcrumbs = Object.values(breadcrumbItems);

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
            breadcrumbs.map((breadcrumb, index) => {
              const catalogPageLink = breadcrumb === BreadcrumbsItem.Product.Catalog && usingComponent === ComponentName.Product && `${breadcrumbsLinks[index]}${currentPage}`;
              const mainLink = breadcrumbsLinks[0];

              const linkElement = (
                <Link className="breadcrumbs__link" to={catalogPageLink || mainLink}>
                  {breadcrumb}
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              );

              const textElement = <span className="breadcrumbs__link breadcrumbs__link--active">{name || breadcrumb}</span>;

              return (
                <li className="breadcrumbs__item" key={breadcrumb}>
                  {index === breadcrumb.length - 1 ? textElement : linkElement}
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
