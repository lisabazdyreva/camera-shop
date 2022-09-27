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

export type MenuItemsType = typeof MenuItem[keyof typeof MenuItem];
