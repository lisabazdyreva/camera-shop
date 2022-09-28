import {State} from '../../types/state';
import {Camera} from '../../types/types';
import {NameSpace} from '../../utils/const';

export const getBasket = (state: State): Camera[] => state[NameSpace.App].basket;