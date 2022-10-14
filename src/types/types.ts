import {
  BreadcrumbsItem,
  ComponentName,
  FilterCameraCategoryDictionary,
  LoadingStatus,
  MenuItem,
  ModalContent,
  RatingClass,
  SortingOrder,
  SortingType,
  SourceItem,
  SupportItem,
  TabType,
  ValidStatus
} from '../utils/const';


export type ModalType = typeof ModalContent[keyof typeof ModalContent];
export type ComponentNameType = typeof ComponentName[keyof typeof ComponentName];
export type BreadcrumbsItemBasketType = typeof BreadcrumbsItem.Basket;
export type BreadcrumbsItemCatalogType = typeof BreadcrumbsItem.Catalog;
export type BreadcrumbsItemProductType = typeof BreadcrumbsItem.Product;
export type RatingClassType = typeof RatingClass[keyof typeof RatingClass];
export type LoadingStatusType = typeof LoadingStatus[keyof typeof LoadingStatus];
export type TabsType = typeof TabType[keyof typeof TabType];//TODO

export type MenuItemsType = typeof MenuItem[keyof typeof MenuItem];
export type SourceItemsType = typeof SourceItem[keyof typeof SourceItem];
export type SupportItemsType = typeof SupportItem[keyof typeof SupportItem];

export type ValidStatusType = typeof ValidStatus[keyof typeof ValidStatus];

export type SortingType = typeof SortingType[keyof typeof SortingType];
export type SortingOrderType = typeof SortingOrder[keyof typeof SortingOrder];

export type SortingData = {
  limit: number,
  startIndex: number,
  sortingType: SortingType,
  sortingOrder: SortingOrderType,
};

export type CameraCategoryType = typeof FilterCameraCategoryDictionary[keyof typeof FilterCameraCategoryDictionary];

