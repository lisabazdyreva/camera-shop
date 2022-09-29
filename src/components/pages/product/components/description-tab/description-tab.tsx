interface DescriptionTabProps {
  description: string,
}

const DescriptionTab = ({description}: DescriptionTabProps) => (
  <div className="product__tabs-text">
    {description}
  </div>
);

{/*<p>*/}
{/*  Немецкий концерн BRW разработал видеокамеру Das Auge IV в&nbsp;начале 80-х годов, однако*/}
{/*  она до&nbsp;сих пор пользуется популярностью среди коллекционеров и&nbsp;яростных*/}
{/*  почитателей старинной техники.*/}
{/*</p>*/}
{/*<p>*/}
{/*  Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот*/}
{/*  чудо-аппарат. Кто знает, может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь к&nbsp;наградам*/}
{/*  всех престижных кинофестивалей.*/}
{/*</p>*/}

export default DescriptionTab;
