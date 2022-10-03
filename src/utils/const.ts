import {Camera} from '../types/types';

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
  ProductError: 'Произошла ошибка',
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

export const Step = {
  Pagination: 9,
  Slider: 3,
} as const;

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


export const BreadcrumbsItem = {
  Basket: {
    Main: 'Главная',
    Basket: 'Корзина',
  },
  Product: {
    Main: 'Главная',
    Catalog: 'Каталог',
    Product: 'Товар',
  },
  Catalog: {
    Main: 'Главная',
    Catalog: 'Каталог',
  }
} as const;

export type BreadcrumbsItemBasketType = typeof BreadcrumbsItem.Basket;
export type BreadcrumbsItemCatalogType = typeof BreadcrumbsItem.Catalog;
export type BreadcrumbsItemProductType = typeof BreadcrumbsItem.Product;

export const BreadcrumbsLink = {
  Main: '/',
  Catalog: '/catalog/page_',
} as const;

export const DescriptionLength = {
  Short: 1,
  Medium: 2,
  Long: 3,
} as const;

export const TabType = {
  Features: 'features',
  Description: 'description',
} as const;


export const TabDictionary = {
  Features: 'Характеристики',
  Description: 'Описание',
} as const;

export const DefaultValue = {
  CatalogPageNumber: 1,
} as const;

export const Navigation = {
  Translation: 'Навигация',
  Items: Object.values(MenuItem),
} as const;

export const Source = {
  Translation: 'Ресурсы',
  Items: Object.values(SourceItem),
} as const;

export const Support = {
  Translation: 'Поддержка',
  Items: Object.values(SupportItem),
} as const;

export const FooterNavigation = {
  Navigation: Navigation,
  Sources: Source,
  Support: Support,
} as const;

export const RatingClass = {
  Catalog: 'product-card__rate',
  Product: 'product__rate',
  Review: 'review-card__rate',
} as const;

export type RatingClassType = typeof RatingClass[keyof typeof RatingClass];

export const SocialName = {
  Vk: 'vk',
  Pinterest: 'pinterest',
  Reddit: 'reddit'
} as const;

export const TabsList = {
  VendorCode: 'Артикул',
  Category: 'Категория',
  Type: 'Тип камеры',
  Level: 'Уровень',
} as const;

export const ReviewItemsList = {
  Advantage: 'Достоинства',
  Disadvantage: 'Недостатки',
  Review: 'Комментарий',
} as const;

export const CAMERA_ADJECTIVE_ENDING = 'ая';

export const InputName = {
  Name: 'name',
  Advantage: 'plus',
  Disadvantage: 'minus',
} as const;

export const InputTitles = {
  Name: 'Ваше имя',
  Advantage: 'Достоинства',
  Disadvantage: 'Недостатки',
} as const;

export const InputPlaceholder = {
  Name: 'Введите ваше имя',
  Advantage: 'Основные преимущества товара',
  Disadvantage: 'Главные недостатки товара',
} as const;

export const InputErrorMessage = {
  Name: 'Нужно указать имя',
  Advantage: 'Нужно указать достоинства',
  Disadvantage: 'Нужно указать недостатки',
} as const;

export const RatingValue = {
  Excellent: 5,
  Good: 4,
  Normal: 3,
  Bad: 2,
  Worse: 1,
} as const;

export const RatingDictionary = {
  Excellent: 'Отлично',
  Good: 'Хорошо',
  Normal: 'Нормально',
  Bad: 'Плохо',
  Worse: 'Ужасно',
} as const;
export const MAX_RATING = 5;

export const ErrorData = {
  Reviews: 'отзывов',
  Product: 'информации о камере',
  Catalog: 'списка камер'
} as const;

