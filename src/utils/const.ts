import {Camera as CameraType} from '../types/camera';
import {ReviewPost} from '../types/review';

export const CAMERA_ADJECTIVE_ENDING = 'ая';
export const FORM_ID_TYPE = 'id';
export const MAX_RATING = 5;
export const LOADER_NOTIFICATION = 'Идёт загрузка...';

export const DEBOUNCE_DELAY = 100;
export const NOT_FOUND_ERROR_STATUS = 400;

export const RU_FORMAT = 'ru';
export const ACTIVE_CLASS = 'is-active';

export const ServerAdaptValue = {
  Photocamera: 'Фотоаппарат',
  Popular: 'rating',
  OrderUp: 'asc',
  OrderDown: 'desc',
} as const;

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
  Home: '/',
  Catalog: '/catalog',
  Basket: '/basket',
  Product: '/product',
  NotFound: '*',
  Page: '/page_',
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
  BasketError: 'Произошла ошибка при отправке',
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

export const UrlRoute = {
  Base: 'https://camera-shop.accelerator.pages.academy',
  Promo: '/promo',
  Cameras: '/cameras',
  Similar: '/similar',
  Reviews: '/reviews',
  Orders: '/orders',
  Coupons: '/coupons',
  Sorting: '_sort',
  Order: '_order',
} as const;


export enum NameSpace {
  App = 'APP',
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Promos = 'PROMOS',
  SimilarCameras = 'SIMILAR_CAMERAS',
  Reviews = 'REVIEWS',
  FilterCameras = 'FILTER_CAMERAS',
  Order = 'ORDER',
}

export const Step = {
  Pagination: 9,
  Slider: 3,
  Reviews: 3,
} as const;

export const ComponentName = {
  Footer: 'footer',
  Header: 'header',
  Catalog: 'catalog',
  Product: 'product',
  Basket: 'basket',
} as const;

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

export const InputName = {
  Name: 'user-name',
  Advantage: 'user-plus',
  Disadvantage: 'user-minus',
  Review: 'user-comment',
  Rating: 'rate',
} as const;

export const InputTitle = {
  Name: 'Ваше имя',
  Advantage: 'Достоинства',
  Disadvantage: 'Недостатки',
  Review: 'Комментарий',
  Rating: 'Рейтинг',
} as const;

export const InputPlaceholder = {
  Name: 'Введите ваше имя',
  Advantage: 'Основные преимущества товара',
  Disadvantage: 'Главные недостатки товара',
  Review: 'Поделитесь своим опытом покупки',
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

export const ErrorData = {
  Reviews: 'отзывов',
  Product: 'информации о камере',
  Catalog: 'списка камер',
  Banner: 'баннера',
} as const;

export const ReviewValidLength = {
  Username: 2,
  Advantage: 3,
  Review: 5,
} as const;

export const TopCoordinate = {
  X: 0,
  Y: 0,
} as const;

export const ScrollSetting = {
  top: 0,
  behavior: 'smooth',
} as const;

export const initialReview: ReviewPost = {
  cameraId: 0,
  userName: '',
  advantage: '',
  disadvantage: '',
  review: '',
  rating: 0,
};

export const initialCamera: CameraType = {
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

export const ValidStatus = {
  Ok: 'Ok',
  Empty: 'Empty',
  Short: 'Short',
} as const;

export const SortingType = {
  Price: 'price',
  Popular: 'popular',
} as const;

export const SortingTypeDictionary = {
  Price: 'по цене',
  Popular: 'по популярности',
} as const;

export const SortingOrder = {
  Ascending: 'up',
  Descending: 'down',
} as const;

export const SortingOrderDictionary = {
  Ascending: 'По возрастанию',
  Descending: 'По убыванию',
} as const;

export const FilterCameraCategoryDictionary = {
  Photocamera: 'Фотокамера',
  Videocamera: 'Видеокамера',
} as const;

export const FilterCameraTypeDictionary = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Snapshot: 'Моментальная',
  Collection: 'Коллекционная',
} as const;

export const FilterCameraLevelDictionary = {
  Zero: 'Нулевой',
  'Non-professional': 'Любительский',
  Professional: 'Профессиональный',
} as const;

export const QueryRoute = {
  Sort: '_sort',
  Order: '_order',
  Type: 'type',
  Level: 'level',
  Category: 'category',
  LowPrice: 'price_gte',
  HighPrice: 'price_lte',
  Start: '_start',
  Limit: '_limit',
  NameLike: 'name_like',
} as const;

export const WarningNotification = {
  Search: 'По вашему запросу ничего не найдено.',
  Filter: 'По таким фильтрам ничего не найдено.',
  Page: 'Такой страницы не найдено.',
  Basket: 'Добавьте товары в корзину.',
  Promo: 'Промокод неверный',
} as const;


export const BasketButtonText = {
  Buy: 'Купить',
  InBasket: 'В корзине',
} as const;

export const CamerasAmount = {
  Max: 99,
  Min: 1,
} as const;

export const CouponValidityStatus = {
  Valid: 'valid',
  Invalid: 'invalid',
  Default: 'default',
} as const;

export const ModalActionName = {
  AddReview: 'addReview',
  AddToBasket: 'addToBasket',
  RemoveFromBasket: 'removeFromBasket',
} as const;

export const ModalInfoName = {
  AddedToBasket: 'addedToBasket',
  ReviewPost: 'reviewPost',
  OrderPost: 'orderPost',
} as const;

export const DateOption = {month: 'long', day: 'numeric'} as const;
export const PriceOption = {style: 'currency', currency: 'RUB', minimumFractionDigits: 0} as const;

export const EscCode = {
  Escape: 'Escape',
  Esc: 'Esc',
} as const;

export const ValidationMessage = {
  EmptyField: 'Заполните поле',
  NameMin: 'Минимальная длина имени:',
  ReviewMin: 'Минимальная длина комментария:',
  DefaultMin: 'Минимальная длина:',
  Valid: '',
} as const;

export const ValidClass = {
  Valid: 'is-valid',
  Invalid: 'is-invalid',
} as const;

export const ErrorNotification = {
  Search: 'При загрузке произошла ошибка. Попробуйте позже',
  Promo: 'Ошибка при отправке.',
} as const;
