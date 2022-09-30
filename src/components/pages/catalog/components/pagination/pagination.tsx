import {Link} from 'react-router-dom';
import {AppRoute, PaginationRoute} from '../../../../../utils/const';

interface PaginationProps {
  currentPageNumber: number;
  setCurrentPageNumber: (page: number) => void;
  pages: number[];
}

const Pagination = ({currentPageNumber, setCurrentPageNumber, pages}: PaginationProps) => {
  const handlePageLinkClick = (number: number) => {
    setCurrentPageNumber(number);
  };

  const handleNextClick = () => {
    setCurrentPageNumber(currentPageNumber + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPageNumber(currentPageNumber - 1);
  };

  const isNotFirstPage = currentPageNumber !== 1;
  const isNotLastPage = currentPageNumber !== pages.length;

  const previousRoute = `${AppRoute.Catalog}${PaginationRoute.Page}${currentPageNumber - 1}`;
  const nextRoute = `${AppRoute.Catalog}${PaginationRoute.Page}${currentPageNumber + 1}`;

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          isNotFirstPage &&
          <li className="pagination__item">
            <Link
              onClick={handlePreviousClick}
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
                  onClick={() => handlePageLinkClick(pageNum)}
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
              onClick={handleNextClick}
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
