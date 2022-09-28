import {Link} from 'react-router-dom';
import {AppRoute, PaginationRoute, CARDS_PER_PAGE} from '../../../utils/const';

interface PaginationProps {
  currentPageNumber: number;
  setCurrentPageNumber: (page: number) => void;
  camerasAmount: number;
}

const Pagination = ({currentPageNumber, setCurrentPageNumber, camerasAmount}: PaginationProps) => {
  const handlePageClick = (number: number) => {
    setCurrentPageNumber(number);
  };

  const handleNextClick = () => {
    setCurrentPageNumber(currentPageNumber + 1);
  };
  const handlePreviousClick = () => {
    setCurrentPageNumber(currentPageNumber - 1);
  };

  const pagesAmount = Math.ceil(camerasAmount / CARDS_PER_PAGE);
  const pages = []; //TODO without arr

  for (let i = 1; i <= pagesAmount; i++) {
    pages[i - 1] = i;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPageNumber !== 1 &&
          <li className="pagination__item">
            <Link onClick={handlePreviousClick} className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}${PaginationRoute.Page}${currentPageNumber - 1}`}>Назад</Link>
          </li>
        }
        {//eslint-disable-next-line
          pages.map((pageNum: number, index: number) => {
            return (
              //eslint-disable-next-line
              <li className="pagination__item" key={index}>
                <Link onClick={() => handlePageClick(pageNum)} className={`pagination__link ${ pageNum === currentPageNumber && 'pagination__link--active'}`} to={`${AppRoute.Catalog}${PaginationRoute.Page}${pageNum}`}>{pageNum}</Link>
              </li>
            );
          })
        }
        {
          currentPageNumber !== pages.length &&
          <li className="pagination__item">
            <Link onClick={handleNextClick} className="pagination__link pagination__link--text" to={`${AppRoute.Catalog}${PaginationRoute.Page}${currentPageNumber + 1}`}>Далее</Link>
          </li>
        }
      </ul>
    </div>
  );
};

export default Pagination;
