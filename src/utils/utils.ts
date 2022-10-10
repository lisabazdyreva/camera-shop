import {
  CAMERA_ADJECTIVE_ENDING,
  ComponentName, InputName,
  ModalContent,
  ModalMessage,
  ReviewValidLength, Step
} from './const';
import {Reviews} from '../types/review';
import {ComponentNameType, ModalType} from '../types/types';
import {Camera} from '../types/camera';

export const getTitle = (component: ComponentNameType, modalType: ModalType, isReviewError?: boolean) => {
  const isModalAction = modalType === ModalContent.Action;

  const productTitle = isReviewError ? ModalMessage.ProductError : ModalMessage.ProductSuccess;

  if (component === ComponentName.Basket) {
    return isModalAction ? ModalMessage.BasketRemove : ModalMessage.BasketSuccess;
  } else if (component === ComponentName.Catalog) {
    return isModalAction ? ModalMessage.CatalogAdd : ModalMessage.CatalogSuccess;
  } else if (component === ComponentName.Product) {
    return isModalAction ? ModalMessage.ProductReviewAdd : productTitle;
  }
};

export const getDateTime = (isoDate: string) => isoDate.slice(0, 10);

export const getDateValue = (isoDate: string) => new Date(isoDate)
  .toLocaleString('ru', {month: 'long', day: 'numeric'});

export const getFormattedPrice = (price: number): string => {
  const numbers = String(price).split('');
  numbers.reverse();

  const step = 3;
  const tens = numbers.slice(0, step);
  const hundreds = numbers.slice(step, step * 2);

  tens.reverse();
  hundreds.reverse();

  return (`${hundreds.join('')} ${tens.join('')} ₽`);
};

export const sortReviews = (reviews: Reviews) => reviews.sort((reviewA, reviewB) => {
  const a = new Date(reviewA.createAt).getTime();
  const b = new Date(reviewB.createAt).getTime();

  return b - a;
});

export const checkIsValid = (target: HTMLInputElement | HTMLTextAreaElement): boolean => {
  switch (target.name) {
    case InputName.Name: {
      if (target.value.trim().length === 0) {
        target.setCustomValidity('Введите имя');
        return false;
      } else if (target.value.trim().length < ReviewValidLength.Username) {
        target.setCustomValidity(`Минимальная длина имени: ${ReviewValidLength.Username}`);
        return false;
      } else {
        target.setCustomValidity('');
        return true;
      }
    }
    case InputName.Advantage:
    case InputName.Disadvantage: {
      if (target.value.trim().length === 0) {
        target.setCustomValidity('Заполните поле');
        return false;
      } else if (target.value.trim().length < ReviewValidLength.Advantage) {
        target.setCustomValidity(`Введите минимум ${ReviewValidLength.Advantage} символа`);
        return false;
      } else {
        target.setCustomValidity('');
        return true;
      }
    }
    case InputName.Review: {
      if (target.value.trim().length === 0) {
        target.setCustomValidity('Добавьте комментарий');
        return false;
      } else if (target.value.trim().length < ReviewValidLength.Review) {
        target.setCustomValidity(`Минимальная длина комментария: ${ReviewValidLength.Review}`);
        return false;
      } else {
        target.setCustomValidity('');
        return true;
      }
    }
    default:
      return false;
  }
};

export const isEsc = (code: string) => code === 'Escape' || code === 'Esc';

export const getPages = (totalCount: number) => {
  const pagesAmount = Math.ceil( totalCount / Step.Pagination);

  const pagesNumbers = [];
  for (let i = 1; i <= pagesAmount; i++) {
    pagesNumbers.push(i);
  }
  return pagesNumbers;
};

export const getPromoLevel = (camera: Camera) => camera.level.slice(0, -2) + CAMERA_ADJECTIVE_ENDING;
