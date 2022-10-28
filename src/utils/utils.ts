import {
  CAMERA_ADJECTIVE_ENDING,
  ComponentName, FilterCameraCategoryDictionary, InputName,
  ModalContent,
  ModalMessage, QueryRoute,
  ReviewValidLength, ServerAdaptValue, SortingOrder, SortingType, Step,
  ValidStatus
} from './const';
import {Reviews} from '../types/review';
import {ComponentNameType, ModalType, ValidStatusType} from '../types/types';
import {Camera} from '../types/camera';
import {State} from '../types/state';

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
  const thousands = numbers.slice(step * 2, step * 3); // TODO переделать

  tens.reverse();
  hundreds.reverse();
  thousands.reverse();

  if (thousands) {
    return (`${thousands.join('')} ${hundreds.join('')} ${tens.join('')} ₽`);
  }

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

export const filterParams = (params: URLSearchParams, exceptions: (string | undefined)[]) => {
  const [exceptionFirst, exceptionSecond] = exceptions;

  const filteredParams = Array.from(params.entries())
    .filter(([, valueParam]) => {
      if (exceptionFirst && exceptionSecond) {
        return valueParam !== exceptionFirst && valueParam !== exceptionSecond;
      }

      if (exceptionFirst) {
        return valueParam !== exceptionFirst;
      }

      return valueParam;
    });

  return new URLSearchParams(filteredParams);
};


export const getParams = (state: State, index?: number, isFetchPrices?: boolean) => {
  const categories = state.FILTER_CAMERAS.currentFilterCategory.map((category) => {
    if (category === FilterCameraCategoryDictionary.Photocamera) {
      return ServerAdaptValue.Photocamera;
    }
    return category;
  });

  const getPrice = (price: string | number) => price === '' ? null : price;

  const sort = state.APP.currentSortingType === SortingType.Popular ? ServerAdaptValue.Popular : state.APP.currentSortingType;
  const order = () => {
    if (state.APP.currentSortingOrder === SortingOrder.Ascending) {
      return ServerAdaptValue.OrderUp;
    }

    if (state.APP.currentSortingOrder === SortingOrder.Descending) {
      return ServerAdaptValue.OrderDown;
    }

    return null;
  };

  const params = {
    [QueryRoute.Type]: state.FILTER_CAMERAS.currentFilterType,
    [QueryRoute.Level]: state.FILTER_CAMERAS.currentFilterLevel,
    [QueryRoute.Category]: categories,
  };

  if (isFetchPrices) {
    return ({
      ...params,
      [QueryRoute.Sort]: SortingType.Price,
    });
  }

  return ({
    ...params,
    [QueryRoute.Start]: index,
    [QueryRoute.Limit]: Step.Pagination,
    [QueryRoute.Sort]: sort,
    [QueryRoute.Order]: order(),
    [QueryRoute.LowPrice]: getPrice(state.FILTER_CAMERAS.lowPrice),
    [QueryRoute.HighPrice]: getPrice(state.FILTER_CAMERAS.highPrice),
  });
};
