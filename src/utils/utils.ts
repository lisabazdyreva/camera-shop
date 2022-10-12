import {
  CAMERA_ADJECTIVE_ENDING,
  ComponentName, InputName,
  ModalContent,
  ModalMessage,
  ReviewValidLength,
  ValidStatus
} from './const';
import {Reviews} from '../types/review';
import {ComponentNameType, ModalType, ValidStatusType} from '../types/types';
import {Camera} from '../types/camera';

export const getTitle = (component: ComponentNameType, modalType: ModalType, isReviewError?: boolean) => {
  const isModalAction = modalType === ModalContent.Action;
  const productTitle = isReviewError ? ModalMessage.ProductError : ModalMessage.ProductSuccess;

  if (component === ComponentName.Basket) {
    return isModalAction ? ModalMessage.BasketRemove : ModalMessage.BasketSuccess;
  }
  if (component === ComponentName.Catalog) {
    return isModalAction ? ModalMessage.CatalogAdd : ModalMessage.CatalogSuccess;
  }
  if (component === ComponentName.Product) {
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


export const setValidationMessage = (target: HTMLInputElement | HTMLTextAreaElement, validityStatus: ValidStatusType) => {
  if (validityStatus === ValidStatus.Ok) {
    target.setCustomValidity('');
    return;
  }

  if (validityStatus === ValidStatus.Empty) {
    target.setCustomValidity('Заполните поле');
    return;
  }

  switch (target.name) {
    case InputName.Name: {
      target.setCustomValidity(`Минимальная длина имени: ${ReviewValidLength.Username}`);
      break;
    }
    case InputName.Advantage:
    case InputName.Disadvantage: {
      target.setCustomValidity(`Введите минимум ${ReviewValidLength.Advantage} символа`);
      break;
    }
    case InputName.Review: {
      target.setCustomValidity(`Минимальная длина комментария: ${ReviewValidLength.Review}`);
    }
  }
};

export const checkValidity = (target: HTMLInputElement | HTMLTextAreaElement): ValidStatusType => {
  const value = target.value;

  if (value.trim().length === 0) {
    return ValidStatus.Empty;
  }

  let requiredLength;

  switch (target.name) {
    case InputName.Name:
      requiredLength = ReviewValidLength.Username;
      break;
    case InputName.Advantage:
    case InputName.Disadvantage:
      requiredLength = ReviewValidLength.Advantage;
      break;
    case InputName.Review:
      requiredLength = ReviewValidLength.Review;
      break;
  }

  return requiredLength && value.trim().length > requiredLength ? ValidStatus.Ok : ValidStatus.Short;
};

export const isEsc = (code: string) => code === 'Escape' || code === 'Esc';

export const getPromoLevel = (camera: Camera) => camera.level.slice(0, -2) + CAMERA_ADJECTIVE_ENDING;
