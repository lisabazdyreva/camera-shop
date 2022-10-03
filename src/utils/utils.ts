import {
  BreadcrumbsLink,
  ComponentName,
  ComponentNameType,
  FooterNavigation,
  MenuItem,
  ModalContent,
  ModalMessage,
  ModalType,
  Rating,
  SocialName,
  TabDictionary,
  TabType,
  TabsList,
  ReviewItemsList,
  InputPlaceholder,
  InputErrorMessage,
  InputTitles,
  InputName,
  RatingDictionary,
  RatingValue
} from './const';
import {Review} from '../types/types';
import {ChangeEvent} from 'react';

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

export const menuItems = Object.values(MenuItem);

export const ratingItems = Object.values(Rating);

export const tabTypes = Object.values(TabType);

export const tabNames = Object.values(TabDictionary);

export const footerNavs = Object.values(FooterNavigation);

export const socialNames = Object.values(SocialName);

export const tabsListNames = Object.values(TabsList);

export const reviewItems = Object.values(ReviewItemsList);
export const reviewNames = Object.keys(ReviewItemsList);

export const getDateTime = (isoDate: string) => isoDate.slice(0, 10); //TODO придумать способ получше

export const getDateValue = (isoDate: string) => new Date(isoDate)
  .toLocaleString('ru', {month: 'long', day: 'numeric'});

export const breadcrumbsLinks = Object.values(BreadcrumbsLink);

export const getFormattedPrice = (price: number): string => {
  const numbers = String(price).split('');
  numbers.reverse();

  const step = 3;
  const tens = numbers.slice(0, step); //TODO как назвать
  const hundreds = numbers.slice(step, step * 2);

  tens.reverse();
  hundreds.reverse();

  return (`${hundreds.join('')} ${tens.join('')} ₽`);
};

export const sortReviews = (reviews: Review[]) => reviews.sort((reviewA, reviewB) => {
  const a = new Date(reviewA.createAt).getTime();
  const b = new Date(reviewB.createAt).getTime();

  return b - a;
});

export const inputs = Object.keys(InputName);
export const inputNames = Object.values(InputName);
export const inputTitles = Object.values(InputTitles);
export const inputPlaceholders = Object.values(InputPlaceholder);
export const inputErrorMessages = Object.values(InputErrorMessage);

export const ratings = Object.values(RatingDictionary);
export const ratingValues = Object.values(RatingValue);


export const checkValidity = (evt: ChangeEvent<HTMLInputElement>) => {
  if (evt.target.value.length < 2) {
    evt.target.setCustomValidity('Введите минимум 2 символа.');
    return false;
  } else if (!isNaN(Number(evt.target.value))) {
    evt.target.setCustomValidity('Ввод чисел не предусмотрен.');
    return false;
  } else {
    evt.target.setCustomValidity('');
    return true;
  }
};

export const isEsc = (code: string) => code === 'Escape' || code === 'Esc';

export const escPressHandler = (handler: any) => {
  let isMounted = true;

  const handleEscapeKeyPress = (evt: KeyboardEvent) => {
    if (isEsc(evt.code)) {
      handler(false);
    }
  };

  if (isMounted) {
    document.addEventListener('keydown', handleEscapeKeyPress);
  }

  return () => {
    document.removeEventListener('keydown', handleEscapeKeyPress);
    isMounted = false;
  };
};

