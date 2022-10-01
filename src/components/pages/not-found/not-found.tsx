import {useNavigate} from 'react-router-dom';
import {AppRoute, DefaultValue, PaginationRoute} from '../../../utils/const';

const NotFound = () => {
  const navigate = useNavigate();
  const text = 'Not Found';

  const onButtonToMainClick = () => {
    navigate(`${AppRoute.Catalog}${PaginationRoute.Page}${DefaultValue.CatalogPageNumber}`);
  };

  return (
    <div>
      {text}
      <button onClick={onButtonToMainClick}>На главную</button>
    </div>
  );
};

export default NotFound;
