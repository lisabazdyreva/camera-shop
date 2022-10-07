const Sorting = ():JSX.Element => (
  <div className="catalog-sort">
    <form action="src/components/pages/catalog/components/sorting/sorting#">
      <div className="catalog-sort__inner">
        <p className="title title--h5">Сортировать:</p>
        <div className="catalog-sort__type">
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPrice" name="sort" disabled/> {/*TODO checked*/}
            <label htmlFor="sortPrice">по цене</label>
          </div>
          <div className="catalog-sort__btn-text">
            <input type="radio" id="sortPopular" name="sort" disabled/>
            <label htmlFor="sortPopular">по популярности</label>
          </div>
        </div>
        <div className="catalog-sort__order">
          <div className="catalog-sort__btn catalog-sort__btn--up">
            <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" disabled/> {/*TODO checked*/}
            <label htmlFor="up">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
          <div className="catalog-sort__btn catalog-sort__btn--down">
            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" disabled/>
            <label htmlFor="down">
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#icon-sort"></use>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default Sorting;
