//eslint-disable-next-line
const Social = () => (
  <ul className="social">
    <li className="social__item">
      <a className="link" href="src/components/common/social/social#" aria-label="Переход на страницу вконтатке">
        <svg width="20" height="20" aria-hidden="true">
          <use xlinkHref="#icon-vk"></use>
        </svg>
      </a>
    </li>
    <li className="social__item">
      <a className="link" href="src/components/common/social/social#" aria-label="Переход на страницу pinterest">
        <svg width="20" height="20" aria-hidden="true">
          <use xlinkHref="#icon-pinterest"></use>
        </svg>
      </a>
    </li>
    <li className="social__item">
      <a className="link" href="src/components/common/social/social#" aria-label="Переход на страницу reddit">
        <svg width="20" height="20" aria-hidden="true">
          <use xlinkHref="#icon-reddit"></use>
        </svg>
      </a>
    </li>
  </ul>
);

export default Social;
