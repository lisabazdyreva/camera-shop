import {Promo} from '../types/promo';
import {Camera} from '../types/camera';
import {Review} from '../types/review';
import faker from 'faker';
import {LoadingStatus} from './const';

export const makeFakeCamera = (): Camera => ({
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

export const makeFakeReview = (): Review => ({
  id: faker.datatype.string(),
  userName: faker.datatype.string(),
  advantage: faker.datatype.string(),
  disadvantage: faker.datatype.string(),
  review: faker.datatype.string(),
  rating: faker.datatype.number(),
  createAt: faker.datatype.string(),
  cameraId: faker.datatype.number(),
});

export const makeFakePromo = () : Promo => ({
  id: faker.datatype.number(),
  name: faker.datatype.string(),
  previewImg: faker.datatype.string(),
  previewImg2x: faker.datatype.string(),
  previewImgWebp: faker.datatype.string(),
  previewImgWebp2x: faker.datatype.string(),
});

export const makeFakeLongDescription = () => faker.datatype.string() + '. ' + faker.datatype.string() + '. ' + faker.datatype.string() + '. ';
export const makeFakeShortDescription = () => faker.datatype.string() + '. ' + faker.datatype.string() + '. ';

export const makeFakeProductFeatures = () => ({
  vendorCode: faker.datatype.string(),
  category: faker.datatype.string(),
  type: faker.datatype.string(),
  level: faker.datatype.string(),
});

export const makeFakeDataTabs = () => ({...makeFakeProductFeatures(), description: makeFakeLongDescription()});


export const getFakeSuccessStatus = () => LoadingStatus.Success;
export const getFakeErrorStatus = () => LoadingStatus.Error;
export const getFakeLoadingStatus = () => LoadingStatus.Loading;

export const makeFakeErrorText = () => faker.datatype.string();


export const makeFakePicture = () => ({
  width: faker.datatype.number(),
  height: faker.datatype.number(),
  alt: faker.datatype.string(),
  src: faker.datatype.string(),
  srcSetImg: faker.datatype.string(),
  srcSetSource: [faker.datatype.string(), faker.datatype.string()],
});
