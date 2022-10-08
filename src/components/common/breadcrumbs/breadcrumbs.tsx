import {Link} from 'react-router-dom';

import {ComponentName, BreadcrumbsItem,} from '../../../utils/const';
import {breadcrumbsLinks} from '../../../utils/utils';
import {useAppSelector} from '../../../hooks';
import {
  ComponentNameType,
  BreadcrumbsItemBasketType,
  BreadcrumbsItemCatalogType,
  BreadcrumbsItemProductType,
} from '../../../types/types';
import {Camera} from '../../../types/camera';

import {getCurrentPage} from '../../../store/app-process/selectors';


interface BreadcrumbsProps {
  data?: Camera | null;
  usingComponent: ComponentNameType;
  breadcrumbItems: BreadcrumbsItemProductType | BreadcrumbsItemBasketType | BreadcrumbsItemCatalogType,
}

const Breadcrumbs = ({data, usingComponent, breadcrumbItems}: BreadcrumbsProps):JSX.Element => {
  const breadcrumbs = Object.values(breadcrumbItems);

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
                  {index === breadcrumbs.length - 1 ? textElement : linkElement}
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
