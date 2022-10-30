import {Promo} from '../types/promo';
import {Camera} from '../types/camera';
import {Review} from '../types/review';
import faker from 'faker';
import {LoadingStatus, NameSpace} from './const';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {initialStateApp} from '../store/process/process';
import {initialStateCameras} from '../store/cameras/cameras';
import {initialStateCamera} from '../store/camera/camera';
import {initialStateFilters} from '../store/filter-cameras/filter-cameras';
import {initialStateReviews} from '../store/reviews/reviews';
import {initialStatePromos} from '../store/promos/promos';
import {initialStateSimilarCameras} from '../store/similar-cameras/similar-cameras';
import {initialStateOrder} from '../store/order/order';

export const getFakeCamera = (): Camera => ({
  id: faker.datatype.number(),
  name: faker.datatype.string(),
  vendorCode: faker.datatype.string(),
  type: faker.datatype.string(),
  category: faker.datatype.string(),
  description: faker.datatype.string(),
  level: faker.datatype.string(),
  rating: faker.datatype.number(),
  price: faker.datatype.number(),
  previewImg: faker.datatype.string(),
  previewImg2x: faker.datatype.string(),
  previewImgWebp: faker.datatype.string(),
  previewImgWebp2x: faker.datatype.string(),
  reviewCount: faker.datatype.number(),
});

export const getFakeReview = (): Review => ({
  id: faker.datatype.string(),
  userName: faker.datatype.string(),
  advantage: faker.datatype.string(),
  disadvantage: faker.datatype.string(),
  review: faker.datatype.string(),
  rating: faker.datatype.number(),
  createAt: faker.datatype.string(),
  cameraId: faker.datatype.number(),
});

export const getFakePromo = () : Promo => ({
  id: faker.datatype.number(),
  name: faker.datatype.string(),
  previewImg: faker.datatype.string(),
  previewImg2x: faker.datatype.string(),
  previewImgWebp: faker.datatype.string(),
  previewImgWebp2x: faker.datatype.string(),
});

export const getFakeLongDescription = () => `${faker.datatype.string() }. ${ faker.datatype.string() }. ${ faker.datatype.string() }. `;
export const getFakeShortDescription = () => `${faker.datatype.string() }. `;

export const getFakeProductFeatures = () => ({
  vendorCode: faker.datatype.string(),
  category: faker.datatype.string(),
  type: faker.datatype.string(),
  level: faker.datatype.string(),
});

export const getFakeDataTabs = () => ({...getFakeProductFeatures(), description: getFakeLongDescription()});


export const getFakeSuccessStatus = () => LoadingStatus.Success;
export const getFakeErrorStatus = () => LoadingStatus.Error;
export const getFakeLoadingStatus = () => LoadingStatus.Loading;

export const getFakeErrorText = () => faker.datatype.string();
export const getFakePicture = () => ({
  width: faker.datatype.number(),
  height: faker.datatype.number(),
  alt: faker.datatype.string(),
  src: faker.datatype.string(),
  srcSetImg: faker.datatype.string(),
  srcSetSource: [faker.datatype.string(), faker.datatype.string()],
});

export const getFakeCameras = () => [
  getFakeCamera(),
  getFakeCamera(),
  getFakeCamera(),
  getFakeCamera(),
  getFakeCamera(),
  getFakeCamera(),
  getFakeCamera(),
  getFakeCamera(),
  getFakeCamera(),
];

export const getFakeReviews = () => [
  getFakeReview(),
  getFakeReview(),
  getFakeReview(),
  getFakeReview(),
  getFakeReview(),
  getFakeReview(),
  getFakeReview(),
  getFakeReview()
];

export const getFakePostReview = () => ({
  userName: faker.datatype.string(),
  advantage: faker.datatype.string(),
  disadvantage: faker.datatype.string(),
  rating: faker.datatype.number(),
  review: faker.datatype.string(),
  cameraId: faker.datatype.number(),
});

export const getFakeID = () => faker.datatype.number();

export const fakeText = faker.datatype.string();
export const api = createAPI();
export const mockAPI = new MockAdapter(api);
export const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

export const UNKNOWN_TYPE = {type: 'UNKNOWN_ACTION'};

export const getMockState = () => ({
  [NameSpace.App]: {...initialStateApp},
  [NameSpace.Cameras]: {...initialStateCameras},
  [NameSpace.Camera]: {...initialStateCamera},
  [NameSpace.FilterCameras]: {...initialStateFilters},
  [NameSpace.Reviews]: {...initialStateReviews},
  [NameSpace.Promos]: {...initialStatePromos},
  [NameSpace.SimilarCameras]: {...initialStateSimilarCameras},
  [NameSpace.Order]: {...initialStateOrder},
});

export const fakeType = faker.datatype.string();
