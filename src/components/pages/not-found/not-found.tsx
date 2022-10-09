import {useNavigate} from 'react-router-dom';
import {AppRoute, DefaultValue, NOT_FOUND_NOTIFICATION, PaginationRoute} from '../../../utils/const';

const NotFound = ():JSX.Element => {
  const navigate = useNavigate();

  const handleButtonToMainClick = () => {
    navigate(`${AppRoute.Catalog}${PaginationRoute.Page}${DefaultValue.CatalogPageNumber}`);
  };

  return (
    <div className='page-content'>
      <div className='page-content__section'>
        <section className='not-found'>
          <p className='not-found__text'>
            {NOT_FOUND_NOTIFICATION}
          </p>
          <div className='not-found__buttons'>
            <button className='btn btn--purple' onClick={handleButtonToMainClick}>На главную</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
