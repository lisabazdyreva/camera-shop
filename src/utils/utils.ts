import {
  BreadcrumbsLink,
  ComponentName,
  FooterNavigation,
  MenuItem,
  ModalContent,
  ModalMessage,
  Rating,
  SocialName,
  TabDictionary,
  TabType,
  TabsList,
  ReviewItemsList,
  RatingDictionary,
  RatingValue, Step
} from './const';
import {Reviews} from '../types/review';
import {ComponentNameType, ModalType} from '../types/types';

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

export const sortReviews = (reviews: Reviews) => reviews.sort((reviewA, reviewB) => {
  const a = new Date(reviewA.createAt).getTime();
  const b = new Date(reviewB.createAt).getTime();

  return b - a;
});

export const ratings = Object.values(RatingDictionary);
export const ratingValues = Object.values(RatingValue);

export const checkIsLength = (value: string) => value.trim().length !== 0;

export const checkIsValid = (target: HTMLInputElement | HTMLTextAreaElement): boolean => {
  switch (target.name) {
    case 'user-name': {
      if (target.value.length === 0) {
        target.setCustomValidity('Введите имя');
        return false;
      } else if (target.value.length < 2) {
        target.setCustomValidity('Минимальная длина имени: 2');
        return false;
      } else {
        target.setCustomValidity('');
        return true;
      }
    }
    case 'user-plus':
    case 'user-minus': {
      if (target.value.length === 0) {
        target.setCustomValidity('Заполните поле');
        return false;
      } else if (target.value.length < 3) {
        target.setCustomValidity('Введите минимум 3 символа');
        return false;
      } else {
        target.setCustomValidity('');
        return true;
      }
    }
    case 'user-comment': {
      if (target.value.length === 0) {
        target.setCustomValidity('Добавьте комментарий');
        return false;
      } else if (target.value.length < 5) {
        target.setCustomValidity('Минимальная длина комментария: 5');
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

export const escPressHandler = (handler: (isOpen: boolean) => void) => { //TODO change name
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

export const getPages = (totalCount: number) => {
  const pagesAmount = Math.ceil( totalCount / Step.Pagination);

  const pagesNumbers = [];
  for (let i = 1; i <= pagesAmount; i++) {
    pagesNumbers.push(i);
  }
  return pagesNumbers;
};

