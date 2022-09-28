import {Camera} from './types';

export const ModalType = {
  Catalog: 'catalog',
  Basket: 'basket',
  Product: 'product',
} as const;

export const MenuItem = {
  Catalog: 'Каталог',
  Guarantees: 'Гарантии',
  Delivery: 'Доставка',
  About: 'О компании',
} as const;

export const AppRoute = {
  Catalog: '/catalog',
  Basket: '/basket',
  Product: '/product'
} as const;

export const ModalMessage = {
  BasketSuccess: 'Спасибо за покупку',
  BasketRemove: 'Удалить этот товар?',
  CatalogSuccess: 'Товар успешно добавлен в корзину',
  CatalogAdd: 'Добавить товар в корзину',
  ProductSuccess: 'Спасибо за отзыв',
  ProductReviewAdd: 'Оставить отзыв',
} as const;

export const LoadingStatus = {
  Default: 'default',
  Loading: 'loading',
  Success: 'success',
  Error: 'error',
} as const;

export type MenuItemsType = typeof MenuItem[keyof typeof MenuItem];

export const initialCamera: Camera = {
  id: 0,
  name: '',
  vendorCode: '',
  type: '',
  category: '',
  description: '',
  level: '',
  rating: 0,
  price: 0,
  previewImg: '',
  previewImg2x: '',
  previewImgWebp: '',
  previewImgWebp2x: '',
  reviewCount: 0,
};
