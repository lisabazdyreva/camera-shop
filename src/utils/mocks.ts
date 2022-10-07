import {Promo} from '../types/promo';
import {Camera} from '../types/camera';
import {Review} from '../types/review';
import faker from 'faker';

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
