import {
  CAMERA_ADJECTIVE_ENDING, DateOption, EscCode, FilterCameraCategoryDictionary, InputName, PriceOption, QueryRoute,
  ReviewValidLength, RU_FORMAT, ServerAdaptValue, SortingOrder, SortingType, Step, ValidationMessage, ValidStatus
} from './const';
import {Reviews} from '../types/review';
import {ValidStatusType} from '../types/types';
import {Camera} from '../types/camera';
import {State} from '../types/state';

export const getDateTime = (isoDate: string) => isoDate.slice(0, 10);

export const getDateValue = (isoDate: string) => new Date(isoDate).toLocaleString(RU_FORMAT, DateOption);

export const getFormattedPrice = (price: number): string => new Intl.NumberFormat(RU_FORMAT, PriceOption).format(price);

export const sortReviews = (reviews: Reviews) => reviews
  .sort((reviewA, reviewB) => new Date(reviewB.createAt).getTime() - new Date(reviewA.createAt).getTime());


export const setValidationMessage = (target: HTMLInputElement | HTMLTextAreaElement, validityStatus: ValidStatusType) => {
  if (validityStatus === ValidStatus.Ok) {
    target.setCustomValidity(ValidationMessage.Valid);
    return;
  }

  if (validityStatus === ValidStatus.Empty) {
    target.setCustomValidity(ValidationMessage.EmptyField);
    return;
  }

  switch (target.name) {
    case InputName.Name: {
      target.setCustomValidity(`${ValidationMessage.NameMin} ${ReviewValidLength.Username}`);
      break;
    }
    case InputName.Advantage:
    case InputName.Disadvantage: {
      target.setCustomValidity(`${ValidationMessage.DefaultMin} ${ReviewValidLength.Advantage}`);
      break;
    }
    case InputName.Review: {
      target.setCustomValidity(`${ValidationMessage.ReviewMin} ${ReviewValidLength.Review}`);
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

export const isEsc = (code: string) => code === EscCode.Escape || code === EscCode.Esc;

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
