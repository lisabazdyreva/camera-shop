import './pagination.css';

import {SyntheticEvent} from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../../../../utils/const';
import {useAppSelector} from '../../../../../hooks';
import {getCurrentPath} from '../../../../../store/process/selectors';

interface PaginationProps {
  currentPageNumber: number;
  setCurrentPageNumber: (page: number) => void;
  pagesAmount: number;
}

const Pagination = ({currentPageNumber, setCurrentPageNumber, pagesAmount}: PaginationProps):JSX.Element => {
  const currentPath = useAppSelector(getCurrentPath);
  const pages = Array.from({length: pagesAmount}).fill('').map((item, index) => index + 1);

  const isNotFirstPage = currentPageNumber !== 1;
  const isNotLastPage = currentPageNumber !== pages.length;

  const handlePreviousLinkClick = () => {
    setCurrentPageNumber(currentPageNumber - 1);
  };

  const handlePageLinkClick = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLElement;
    const pageNumber = Number(target.innerHTML);

    setCurrentPageNumber(pageNumber);
  };

  const handleNextLinkClick = () => {
    setCurrentPageNumber(currentPageNumber + 1);
  };

  const currentPathUrl = `/?${currentPath}`;
  const previousRoute = `${AppRoute.Catalog}${AppRoute.Page}${currentPageNumber - 1}${currentPath && currentPathUrl}`;
  const nextRoute = `${AppRoute.Catalog}${AppRoute.Page}${currentPageNumber + 1}${currentPath && currentPathUrl}`;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          isNotFirstPage &&
          <li className="pagination__item">
            <Link onClick={handlePreviousLinkClick} className="pagination__link pagination__link--text" to={previousRoute}>
              Назад
            </Link>
          </li>
        }
        {
          pages.map((pageNum: number) => {

            const route = `${AppRoute.Catalog}${AppRoute.Page}${pageNum}${currentPath && currentPathUrl}`;
            const classes = `pagination__link ${pageNum === currentPageNumber && 'pagination__link--active'}`;
            return (
              <li className="pagination__item" key={pageNum}>
                <Link onClick={handlePageLinkClick} className={classes} to={route}>
                  {pageNum}
                </Link>
              </li>
            );
          })
        }
        {
          isNotLastPage
           &&
          <li className="pagination__item">
            <Link onClick={handleNextLinkClick} className="pagination__link pagination__link--text" to={nextRoute}>
              Далее
            </Link>
          </li>
        }
      </ul>
    </div>
  );
};

export default Pagination;
