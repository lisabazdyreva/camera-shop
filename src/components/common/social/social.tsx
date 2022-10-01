import {socialNames} from '../../../utils/utils';

const Social = () => (
  <ul className="social">
    {
      socialNames.map((socialName) => {
        const icon = `#icon-${socialName}`;
        return (
          <li className="social__item" key={socialName}>
            <a className="link" href="#" aria-label={`Переход на страницу ${socialName}`}>
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref={icon}></use>
              </svg>
            </a>
          </li>
        );
      })
    }
  </ul>
);

export default Social;
