import './not-found.css';

import {useNavigate} from 'react-router-dom';
import {AppRoute, DefaultValue, WarningNotification} from '../../../utils/const';

const NotFound = ():JSX.Element => {
  const navigate = useNavigate();

  const handleToMainButtonClick = () => {
    navigate(`${AppRoute.Catalog}${AppRoute.Page}${DefaultValue.CatalogPageNumber}`);
  };

  return (
    <div className='page-content'>
      <div className='page-content__section'>
        <section className='not-found'>
          <p className='not-found__text'>
            {WarningNotification.Page}
          </p>
          <div className='not-found__buttons'>
            <button className='btn btn--purple' onClick={handleToMainButtonClick}>Каталог</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
