import {useNavigate} from 'react-router-dom';
import {AppRoute, DefaultValue, PaginationRoute} from '../../../utils/const';

const NotFound = () => {
  const navigate = useNavigate();
  const text = 'Такой страницы не найдено.';

  const onButtonToMainClick = () => {
    navigate(`${AppRoute.Catalog}${PaginationRoute.Page}${DefaultValue.CatalogPageNumber}`);
  };

  return (
    <div className='page-content'>
      <div className='page-content__section'>
        <section className='not-found'>
          <p className='not-found__text'>
            {text}
          </p>
          <div className='not-found__buttons'>
            <button className='btn btn--purple' onClick={onButtonToMainClick}>На главную</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
