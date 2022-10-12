import './pagination.css';

import {Link} from 'react-router-dom';
import {AppRoute, PaginationRoute} from '../../../../../utils/const';
import {SyntheticEvent} from 'react';

interface PaginationProps {
  currentPageNumber: number;
  setCurrentPageNumber: (page: number) => void;
  pagesAmount: number;
}

const Pagination = ({currentPageNumber, setCurrentPageNumber, pagesAmount}: PaginationProps):JSX.Element => {
  const pages = Array.from({length: pagesAmount}).fill('').map((item, index) => index + 1);

  const isNotFirstPage = currentPageNumber !== 1;
  const isNotLastPage = currentPageNumber !== pages.length;

  const handlePreviousLinkClick = () => {
    setCurrentPageNumber(currentPageNumber - 1);
  };

  const handlePageClick = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLElement;
    const pageNumber = Number(target.innerHTML);

    setCurrentPageNumber(pageNumber);
  };

  const handleNextLinkClick = () => {
    setCurrentPageNumber(currentPageNumber + 1);
  };

  const previousRoute = `${AppRoute.Catalog}${PaginationRoute.Page}${currentPageNumber - 1}`;
  const nextRoute = `${AppRoute.Catalog}${PaginationRoute.Page}${currentPageNumber + 1}`;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          isNotFirstPage &&
          <li className="pagination__item">
            <Link
              onClick={handlePreviousLinkClick}
              className="pagination__link pagination__link--text"
              to={previousRoute}
            >
              Назад
            </Link>
          </li>
        }
        {
          pages.map((pageNum: number) => {
            const route = `${AppRoute.Catalog}${PaginationRoute.Page}${pageNum}`;
            const classes = `pagination__link ${ pageNum === currentPageNumber && 'pagination__link--active'}`;
            return (
              <li className="pagination__item" key={pageNum}>
                <Link
                  onClick={handlePageClick}
                  className={classes}
                  to={route}
                >
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
            <Link
              onClick={handleNextLinkClick}
              className="pagination__link pagination__link--text"
              to={nextRoute}
            >
              Далее
            </Link>
          </li>
        }
      </ul>
    </div>
  );
};

export default Pagination;
