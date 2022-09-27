import {MenuItem, ModalMessage, ModalType} from '../types/const';

export const getTitle = (modalType: typeof ModalType[keyof typeof ModalType], isModalDetailed: boolean) => {
  if (modalType === ModalType.Basket) {
    return isModalDetailed ? ModalMessage.BasketRemove : ModalMessage.BasketSuccess;
  } else if (modalType === ModalType.Catalog) {
    return isModalDetailed ? ModalMessage.CatalogAdd : ModalMessage.CatalogSuccess;
  } else if (modalType === ModalType.Product) {
    return isModalDetailed ? ModalMessage.ProductReviewAdd : ModalMessage.ProductSuccess;
  }
};

export const menuItems = Object.values(MenuItem);
