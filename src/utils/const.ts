import {Camera} from '../types/types';

// export const ModalType = {
//   Catalog: 'catalog',
//   Basket: 'basket',
//   Product: 'product',
// } as const;

export const MenuItem = {
  Catalog: 'Каталог',
  Guarantees: 'Гарантии',
  Delivery: 'Доставка',
  About: 'О компании',
} as const;

export const SourceItem = {
  Courses: 'Курсы операторов',
  Blog: 'Блог',
  Community: 'Сообщество',
} as const;

export const SupportItem = {
  FAQ: 'FAQ',
  Question: 'Задать вопрос',
} as const;

export const AppRoute = {
  Catalog: '/catalog',
  Basket: '/basket',
  Product: '/product'
} as const;

export const PaginationRoute = {
  Page: '/page_',
  DefaultPage: '/page_1',
} as const;

export const Rating = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
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
export type SourceItemsType = typeof SourceItem[keyof typeof SourceItem];
export type SupportItemsType = typeof SupportItem[keyof typeof SupportItem];

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

export const UrlRoute = {
  Base: 'https://camera-shop.accelerator.pages.academy',
  Promo: '/promo',
  Cameras: '/cameras',
  Similar: '/similar',
  Reviews: '/reviews',
} as const;

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  Status = 'STATUS',
}

export const CARDS_PER_PAGE = 9;

export const ComponentName = {
  Footer: 'footer',
  Header: 'header',
  Catalog: 'catalog',
  Product: 'product',
  Basket: 'basket',
} as const;

export const ModalContent = {
  Info: 'info',
  Action: 'action',
} as const;


export type ModalType = typeof ModalContent[keyof typeof ModalContent];
export type ComponentNameType = typeof ComponentName[keyof typeof ComponentName];
