import {
  ComponentName,
  ComponentNameType,
  MenuItem,
  ModalContent,
  ModalMessage,
  ModalType,
  Rating,
  SourceItem,
  SupportItem
} from './const';

export const getTitle = (component: ComponentNameType, modalType: ModalType) => {
  const isModalAction = modalType === ModalContent.Action;
  if (component === ComponentName.Basket) {
    return isModalAction ? ModalMessage.BasketRemove : ModalMessage.BasketSuccess;
  } else if (component === ComponentName.Catalog) {
    return isModalAction ? ModalMessage.CatalogAdd : ModalMessage.CatalogSuccess;
  } else if (component === ComponentName.Product) {
    return isModalAction ? ModalMessage.ProductReviewAdd : ModalMessage.ProductSuccess;
  }
};

export const menuItems = Object.values(MenuItem);

export const ratings = Object.values(Rating);

export const sourceItems = Object.values(SourceItem);

export const supportItems = Object.values(SupportItem);

export const getDateTime = (isoDate: string) => isoDate.slice(0, 10); //TODO придумать способ получше

export const getDateValue = (isoDate: string) => new Date(isoDate)
  .toLocaleString('ru', {month: 'long', day: 'numeric'}); //TODO убрать магические значения


