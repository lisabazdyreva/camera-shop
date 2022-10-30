import {
  BreadcrumbsItem, ComponentName, CouponValidityStatus, LoadingStatus, MenuItem, ModalActionName,
  ModalInfoName, RatingClass, SortingOrder, SortingType, SourceItem, SupportItem, ValidStatus
} from '../utils/const';

export type ComponentNameType = typeof ComponentName[keyof typeof ComponentName];
export type BreadcrumbsItemBasketType = typeof BreadcrumbsItem.Basket;
export type BreadcrumbsItemCatalogType = typeof BreadcrumbsItem.Catalog;
export type BreadcrumbsItemProductType = typeof BreadcrumbsItem.Product;
export type RatingClassType = typeof RatingClass[keyof typeof RatingClass];
export type LoadingStatusType = typeof LoadingStatus[keyof typeof LoadingStatus];

export type MenuItemsType = typeof MenuItem[keyof typeof MenuItem];
export type SourceItemsType = typeof SourceItem[keyof typeof SourceItem];
export type SupportItemsType = typeof SupportItem[keyof typeof SupportItem];

export type ValidStatusType = typeof ValidStatus[keyof typeof ValidStatus];

export type SortingTypesType = typeof SortingType[keyof typeof SortingType];
export type SortingOrderType = typeof SortingOrder[keyof typeof SortingOrder];

export type CouponValidityStatusType = typeof CouponValidityStatus[keyof typeof CouponValidityStatus];
export type ModalActionNameType = typeof ModalActionName[keyof typeof ModalActionName];
export type ModalInfoNameType = typeof ModalInfoName[keyof typeof ModalInfoName];

