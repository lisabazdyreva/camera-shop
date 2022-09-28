interface BasketItemShortProps {
  data: {
    name: string;
    price: number;
  }
}


const BasketItemShort = ({data}: BasketItemShortProps) => {
  const {name, price} = data;
  return (
    <div className="basket-item basket-item--short">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x" />
          <img
            src="img/content/img9.jpg"
            srcSet="img/content/img9@2x.jpg 2x"
            width="140"
            height="120"
            alt="Фотоаппарат «Орлёнок»"
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p> {/*TODO format Фотоаппарат «Орлёнок»*/}
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">O78DFGSD832</span>
          </li>
          <li className="basket-item__list-item">Плёночная фотокамера</li>
          <li className="basket-item__list-item">Любительский уровень</li>
        </ul>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p> {/*TODO format 18 970*/}
      </div>
    </div>
  );
};

export default BasketItemShort;
