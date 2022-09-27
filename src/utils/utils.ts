import {ModalType} from '../types/types';

export const getTitle = (modalType: typeof ModalType[keyof typeof ModalType], isModalDetailed: boolean) => {
  if (modalType === ModalType.Basket) {
    return isModalDetailed ? 'Удалить этот товар?' : 'Спасибо за покупку';
  } else if (modalType === ModalType.Catalog) {
    return isModalDetailed ? 'Добавить товар в корзину' : 'Товар успешно добавлен в корзину';
  } else if (modalType === ModalType.Product) {
    return isModalDetailed ? 'Оставить отзыв' : 'Спасибо за отзыв';
  }
};

