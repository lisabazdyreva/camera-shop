import {State} from '../../types/state';
import {LoadingStatusType} from '../../types/types';
import {NameSpace} from '../../utils/const';
import {Cameras} from '../../types/camera';

export const getOrderPostStatus = (state: State): LoadingStatusType => state[NameSpace.Order].orderPostStatus;
export const getCouponsPostStatus = (state: State): LoadingStatusType => state[NameSpace.Order].couponPostStatus;
export const getDiscount = (state: State): number | null => state[NameSpace.Order].discount;

export const getBasket = (state: State): Cameras => state[NameSpace.Order].basket;
