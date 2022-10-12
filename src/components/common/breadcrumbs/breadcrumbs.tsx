import './breadcrumbs.css';

import {Link} from 'react-router-dom';

import {ComponentName, BreadcrumbsItem, BreadcrumbsLink,} from '../../../utils/const';
import {useAppSelector} from '../../../hooks';
import {
  ComponentNameType,
  BreadcrumbsItemBasketType,
  BreadcrumbsItemCatalogType,
  BreadcrumbsItemProductType,
} from '../../../types/types';
import {Camera} from '../../../types/camera';

import {getCurrentPage} from '../../../store/process/selectors';


interface BreadcrumbsProps {
  data?: Camera | null;
  usingComponent: ComponentNameType;
  breadcrumbItems: BreadcrumbsItemProductType | BreadcrumbsItemBasketType | BreadcrumbsItemCatalogType,
}

const Breadcrumbs = ({data, usingComponent, breadcrumbItems}: BreadcrumbsProps):JSX.Element => {
  const currentPage = useAppSelector(getCurrentPage);

  let name: string;
  if (data) {
    name = data.name;
  }

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {
            Object.values(breadcrumbItems).map((breadcrumb, index) => {
              const catalogPageLink = breadcrumb === BreadcrumbsItem.Product.Catalog && usingComponent === ComponentName.Product && `${Object.values(BreadcrumbsLink)[index]}${currentPage}`;
              const mainLink = Object.values(BreadcrumbsLink)[0];

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
                  {index === Object.values(breadcrumbItems).length - 1 ? textElement : linkElement}
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
